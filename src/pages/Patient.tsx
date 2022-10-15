import React, { useState } from 'react';
import classes from './Inventory.module.scss';
import { Dropdown } from '../components/UI/Dropdown';
import { ButtonsHeader } from '../components/UI/ButtonsHeader';
import { EditableTableChecking } from '../components/UI/EditableTableChecking';
import { Input } from '../components/UI/Input';
import { IColumn } from '../components/UI/GlobalTable';
import { IEmployee, IStore } from '../ts/types';
import { AccountantButtons } from '../components/accountant/AccountantButtons';
import { data } from '../consts/data';
import { useTranslations } from '../hooks/useTranslations';
import { Button } from '../components/UI/Button';

const hashMap = new Map();
hashMap.set('result', 'normal');

interface IHeaderType {
  dataIndex: string;
  sorter: boolean;
  editable?: boolean;
}

const columns: IHeaderType[] = [
  { dataIndex: 'component', sorter: false, editable: false },
  { dataIndex: 'result', sorter: false, editable: true },
  { dataIndex: 'unit', sorter: false, editable: false },
  { dataIndex: 'normal', sorter: false, editable: false },
  { dataIndex: 'comment', sorter: false, editable: false },
];

export const Patient = () => {
  const { t } = useTranslations();

  const [IIN, setIIN] = useState('');
  const [code, setCode] = useState('');
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(`Form submitted, ${IIN}`);
  };
  const [isFilled, setIsFilled] = useState(false);

  const handleSentClick = () => {
    if (IIN && code == '1555666') {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  return (
    <main className={classes['inventory']}>
      <AccountantButtons />
      <div className={classes['inventory__table']}>
          <EditableTableChecking columns={columns} data={data} pairs={hashMap} />
        </div>
    </main>
  );
};
