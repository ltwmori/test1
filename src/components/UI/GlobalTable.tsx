import React, { useMemo, useState } from 'react';
import classes from './GlobalTable.module.scss';
import { useTranslations } from '../../hooks/useTranslations';

export const filterInactive = (
  <div className={classes['filters']}>
    <img src="../../assets/icons/sort-arrow-up.svg" alt="+" />
    <img src={'../../assets/icons/sort-arrow-down.svg'} alt={'+'} />
  </div>
);

export const filterAsc = (
  <div className={classes['filters']}>
    <img src="../../assets/icons/sort-arrow-up.svg" alt="+" />
    <img src={'../../assets/icons/sort-arrow-down-inactive.svg'} alt={'-'} />
  </div>
);

export const filterDesc = (
  <div className={classes['filters']}>
    <img src="../../assets/icons/sort-arrow-up-inactive.svg" alt="-" />
    <img src={'../../assets/icons/sort-arrow-down.svg'} alt={'+'} />
  </div>
);

export interface IColumn {
  dataIndex: string;
  sorter: boolean;
  editable?: boolean;
}

export enum sortingOrder {
  asc = 'asc',
  desc = 'desc',
  none = 'none',
}

type Props = {
  columns: IColumn[];
  data: any[];
};

const GlobalTable: React.FC<Props> = ({ columns, data }) => {
  const [rows, setRows] = useState<any[]>([...data]);
  const [sortKey, setSortKey] = useState<string>(columns[0].dataIndex);
  const [sortOrder, setSortOrder] = useState<sortingOrder>(sortingOrder.none);
  const { t } = useTranslations();

  const sortTable = (key: string, tableData: any[], order: sortingOrder) => {
    if (order === sortingOrder.none || !sortKey) {
      return data;
    } else {
      if (key === 'date') {
        const sortedDate = tableData.sort((a, b) => (new Date(a[key]) > new Date(b[key]) ? 1 : -1));
        return order === sortingOrder.desc ? sortedDate.reverse() : sortedDate;
      }
      const sorted = tableData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      return order === sortingOrder.desc ? sorted.reverse() : sorted;
    }
  };

  const sorted = useMemo(() => {
    return sortTable(sortKey, rows, sortOrder);
  }, [rows, sortKey, sortOrder]);

  const changeSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder(sortingOrder.asc);
    } else {
      if (sortOrder === sortingOrder.asc) {
        setSortOrder(sortingOrder.desc);
      } else if (sortOrder === sortingOrder.desc) {
        setSortOrder(sortingOrder.none);
      } else {
        setSortOrder(sortingOrder.asc);
      }
    }
  };

  return (
    <div className={classes['wrapper']}>
      <table className={classes['table']}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.dataIndex}
                onClick={column.sorter ? () => changeSort(column.dataIndex) : undefined}
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
          </tr>
        </thead>
        <tbody>
          {sorted.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key, index) => {
                return (
                  <td
                    key={`${item[key]}--${index}`}
                    className={key === 'state' ? classes[`status--${item[key]}`] : undefined}
                  >
                    {t(item[key])}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GlobalTable;
