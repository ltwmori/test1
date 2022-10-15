import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classes from './EditableTableChecking.module.scss';
import { Checkbox } from './Checkbox';
import { filterAsc, filterDesc, filterInactive, IColumn, sortingOrder } from './GlobalTable';
import { useTranslations } from '../../hooks/useTranslations';
import { Tooltip } from './Tooltip';
import { useLanguageContext } from '../../contexts/LanguageContext';
import classNames from 'classnames';
import { Dropdown } from './Dropdown';

type PropsType = {
  columns: IColumn[];
  data: any[];
  footerColumns?: string[];
  pairs?: Map<string, string>;
};

type ActionType = {
  name: string;
  handler: (item: any) => void;
};

const AnalysisTypes = ['Выберите опцию', 'Анализ гормонов', 'Анализ мочи', 'Общий анализ крови'];

export const EditableTableChecking: React.FC<PropsType> = ({
  columns,
  data,
  footerColumns,
  pairs,
}) => {
  const [rows, setRows] = useState<any[]>([...data]);
  const [sortKey, setSortKey] = useState<string>(columns[0].dataIndex);
  const [sortOrder, setSortOrder] = useState<sortingOrder>(sortingOrder.none);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [tooltipId, setTooltipId] = useState<number | null>(null);
  const [actions, setActions] = useState<ActionType[]>([]);
  const [editing, setEditing] = useState<number[]>([]);
  const { t } = useTranslations();
  const [anType, setDocType] = useState<string>(AnalysisTypes[0]);
  const { language } = useLanguageContext();

  const [footerWithEmptyCols, setFooterWithEmptyCols] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tableHeadRow = useRef<HTMLTableRowElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  //   const [selected, setSelected] = useState(AnalysisTypes[0].valueOf);

  //   const handleChange = (event: { target: { value: any } }) => {
  //     console.log(event.target.value);
  //     setSelected(event.target.value);
  //   };

  useEffect(() => {
    setRows((rs) => rs.map((r) => ({ ...r, checked: false })));
  }, [data]);

  useEffect(() => {
    if (footerColumns) {
      const minIndex = footerColumns.reduce(
        (acc, x) =>
          Math.min(
            acc,
            columns.findIndex((col) => col.dataIndex === x)
          ),
        1000
      );

      setFooterWithEmptyCols([...columns.slice(minIndex).map((col) => col.dataIndex)]);
    }
  }, [columns, footerColumns]);

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

  const getSumOfCols = useMemo(() => {
    if (footerColumns) {
      const hashSum = new Map();
      footerColumns.forEach((col) => {
        const sum = data?.length > 0 ? data.reduce((acc, item) => acc + item[col], 0) : 0;
        hashSum.set(col, sum);
      });
      return hashSum;
    }
    return undefined;
  }, [footerColumns, data]);

  const jsonParse = (value: string, num: string) => {
    const val = value.split('-');
    // replalce all , with .
    const res = val.map((v) => v.replace(/,/g, '.'));
    const lim1 = res[0];
    const lim2 = res[1];
    if (Number(num) >= Number(lim1) && Number(num) <= Number(lim2)) {
      return 'normal';
    } else if (Number(num) < Number(lim1)) {
      return 'low';
    } else if (Number(num) > Number(lim2)) {
      return 'high';
    } else {
      return 'normal';
    }
  };

  return (
    <div className={classes['container']}>
      <div className={classes['cont']}></div>
      <div className={classes['wrapper']} ref={wrapperRef}>
        <Dropdown
          options={AnalysisTypes}
          placeholder={'Вид анализа'}
          onChange={setDocType}
          withSearch={false}
          selectedOption={anType}
          label={'Вид анализа'}
        />
        <div className={classes['cont']}></div>
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
                    jsonParse(item[pairs.get(dataIndex)!.toString()], item[dataIndex]) !==
                      'normal' ? (
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
