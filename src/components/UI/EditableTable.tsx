import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import classes from './EditableTable.module.scss';
import { Checkbox } from './Checkbox';
import { filterAsc, filterDesc, filterInactive, IColumn, sortingOrder } from './GlobalTable';
import { useTranslations } from '../../hooks/useTranslations';
import { Tooltip } from './Tooltip';
import { useLanguageContext } from '../../contexts/LanguageContext';
import classNames from 'classnames';

type PropsType = {
  columns: IColumn[];
  data: any[];
  pairs?: Map<string, string>;
};

type ActionType = {
  name: string;
  handler: (item: any) => void;
};

export const EditableTable: React.FC<PropsType> = ({ columns, data, pairs }) => {
  const [rows, setRows] = useState<any[]>([...data]);
  const [sortKey, setSortKey] = useState<string>(columns[0].dataIndex);
  const [sortOrder, setSortOrder] = useState<sortingOrder>(sortingOrder.none);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [tooltipId, setTooltipId] = useState<number | null>(null);
  const [actions, setActions] = useState<ActionType[]>([]);
  const [editing, setEditing] = useState<number[]>([]);
  const { t } = useTranslations();
  const { language } = useLanguageContext();

  const [footerWithEmptyCols, setFooterWithEmptyCols] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tableHeadRow = useRef<HTMLTableRowElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setRows((rs) => rs.map((r) => ({ ...r, checked: false })));
  }, [data]);

 

  const sortTable = (key: string) => {
    const newOrder: string = sortOrder === 'asc' ? 'desc' : 'asc';

    setSortKey(key);
    setSortOrder(newOrder as sortingOrder);

    const sorted = [...rows];
    sorted.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    setRows(newOrder === 'asc' ? sorted : sorted.reverse());
  };

  const handleCheckAll = () => {
    setCheckedAll((c) => !c);
    setRows((rs) => [...rs.map((r) => ({ ...r, checked: !checkedAll }))]);
  };

  const handleCheckItem = (item: any) => {
    setRows((rs) => rs.map((r) => (r.number === item.number ? { ...r, checked: !r.checked } : r)));
  };

  const handleTooltipOpen = (id: number) => {
    setTooltipId(id);
  };

  const handleTooltipClose = useCallback(() => {
    setTooltipId(null);
  }, []);

  const handleEditClick = (item: any) => {
    setEditing((arr) => [...arr, item.number]);
    handleTooltipClose();
  };

  const handleAddClick = () => {
    handleTooltipClose();
  };

  const handleDeleteClick = (item: any) => {
    setRows((rs) => rs.filter((r) => r.number !== item.number));
    handleTooltipClose();
  };

  useEffect(() => {
    setActions([
      {
        name: 'edit',
        handler: handleEditClick,
      },
      {
        name: 'add',
        handler: handleAddClick,
      },
      {
        name: 'delete',
        handler: handleDeleteClick,
      },
    ]);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataIndex: string,
    item: any
  ) => {
    setRows((rs) =>
      rs.map((r) => (r.number === item.number ? { ...r, [dataIndex]: e.target.value } : r))
    );
  };

  useEffect(() => {
    const tableHeads = tableHeadRow.current?.children || [];
    const footerChildren = (footerRef.current?.getElementsByTagName('div') ||
      []) as HTMLCollectionOf<HTMLElement>;
    footerWithEmptyCols.forEach((col, index) => {
      const tableHeadIndex = columns.findIndex((c) => c.dataIndex === col) + 1;
      const tableHead = tableHeads[tableHeadIndex];
      const tableHeadClient = tableHead.getBoundingClientRect();
      const footerChild = footerChildren[index];
      const wrapperLeft = wrapperRef.current?.getBoundingClientRect().left || 0;
      footerChild.style.position = 'absolute';
      footerChild.style.width = `${tableHeadClient.width}px`;
      footerChild.style.left = `${tableHeadClient.left - wrapperLeft}px`;
      footerChild.style.right = `${tableHeadClient.right - wrapperLeft}px`;
      footerChild.style.borderLeft = '1px solid var(--color-grey-2)';
      footerChild.style.borderRight = '1px solid var(--color-grey-2)';
    });

    const total = footerRef.current?.children[0] as HTMLElement;
    if (total) {
      total.innerHTML = t('total');
      total.style.position = 'absolute';
      total.style.left = `${
        footerChildren[0]?.getBoundingClientRect().left -
        (wrapperRef.current?.getBoundingClientRect().left || 0) -
        footerChildren[0]?.getBoundingClientRect().width -
        10
      }px`;
    }
  }, [footerWithEmptyCols, language]);

 
  return (
    <div className={classes['container']}>
      <div className={classes['container-info']}>
        <h3>
          <b>{t('name')}:</b> {'КАНАТОВ КАНАТ КАНАТОВИЧ'}
        </h3>
        <h3>
          <b>{t('num')}: </b> {'1555666'}
        </h3>
        <h3>
          <b>{t('executor')}: </b> {'Процедурный кабинет "Сарыарка-24" - Астана'} 
        </h3>
        <h3>
          <b>{t('dateExecute')}: </b> {'20.07.2022 12:00'}
        </h3>
      </div>
      <div className={classes['cont']}></div>
      <div className={classes['wrapper']} ref={wrapperRef}>
        <table className={classes['table']}>
          <thead>
            <tr ref={tableHeadRow}>
              <th>
                <Checkbox checked={checkedAll} onChange={handleCheckAll} name="checkAll" />
              </th>
              {columns.map((column) => (
                <th
                  key={column.dataIndex}
                  onClick={column.sorter ? () => sortTable(column.dataIndex) : undefined}
                >
                  <div className={classes['headers']}>
                    {t(column.dataIndex)}
                    {column.sorter
                      ? sortKey !== column.dataIndex
                        ? filterInactive
                        : sortOrder === sortingOrder.none
                        ? filterInactive
                        : sortOrder === sortingOrder.desc
                        ? filterDesc
                        : filterAsc
                      : null}
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr key={index} className={item.checked ? classes['table__tr--checked'] : ''}>
                <td>
                  <Checkbox
                    checked={item.checked}
                    onChange={() => handleCheckItem(item)}
                    name={item.number}
                  />
                </td>
                {columns.map(({ dataIndex, editable }, index) => {
                  return pairs &&
                    pairs.has(dataIndex) &&
                    pairs.get(dataIndex) &&
                    item[pairs.get(dataIndex)!.toString()] !== item[dataIndex] ? (
                    <td
                      key={`${item[dataIndex]}--${index}`}
                      className={classes[`status--shortage`]}
                    >
                      {editable && editing.includes(item.number) ? (
                        <input
                          type="text"
                          className={classes['item__input']}
                          value={item[dataIndex]}
                          onChange={(e) => handleInputChange(e, dataIndex, item)}
                        />
                      ) : (
                        t(item[dataIndex])
                      )}
                    </td>
                  ) : (
                    <td
                      key={`${item[dataIndex]}--${index}`}
                      className={
                        dataIndex === 'state' ? classes[`status--${item[dataIndex]}`] : undefined
                      }
                    >
                      {editable && editing.includes(item.number) ? (
                        <input
                          type="text"
                          className={classes['item__input']}
                          value={item[dataIndex]}
                          onChange={(e) => handleInputChange(e, dataIndex, item)}
                        />
                      ) : (
                        t(item[dataIndex])
                      )}
                    </td>
                  );
                })}
                <td className={classes['table__actions']}>
                  <div
                    id={`tooltip-trigger-${item.number}`}
                    className={classes['table__img-wrapper']}
                    onClick={() => handleTooltipOpen(item.number)}
                  >
                    <img src="../assets/icons/vertical-dots.svg" alt="Vertical dots" />
                  </div>
                  {item.number === tooltipId && (
                    <Tooltip
                      open={!!tooltipId}
                      handleClose={handleTooltipClose}
                      targetId={`tooltip-trigger-${item.number}`}
                    >
                      <ul className={classes['actions-list']}>
                        {actions.map((action) => (
                          <li key={action.name} onClick={() => action.handler.call(this, item)}>
                            {t(action.name)}
                          </li>
                        ))}
                      </ul>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
