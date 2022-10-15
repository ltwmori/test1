import React, { useState } from 'react';
import classes from './Inventory.module.scss';
import { Dropdown } from '../components/UI/Dropdown';
import { ButtonsHeader } from '../components/UI/ButtonsHeader';
import { EditableTable } from '../components/UI/EditableTable';
import { Input } from '../components/UI/Input';
import { IColumn } from '../components/UI/GlobalTable';
import { IEmployee, IStore } from '../ts/types';
import { AccountantButtons } from '../components/accountant/AccountantButtons';
import { data } from '../consts/data';
import { useTranslations } from '../hooks/useTranslations';
import { Button } from '../components/UI/Button';


const hashMap = new Map();
hashMap.set('quantity_fact', 'quantity_account');
hashMap.set('total_sum_fact', 'total_sum_account');

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

export const Home = () => {
  const { t } = useTranslations();

  const [IIN, setIIN] = useState('');
  const [code, setCode] = useState('');
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    console.log(`Form submitted, ${IIN}`);
  };
  const [isFilled, setIsFilled] = useState(false);

  const handleSentClick = () => {
    if (IIN && code=='1555666') {
      setIsFilled(true);
    }
    else {
      setIsFilled(false);
    }
  };

  return (
    <main className={classes['inventory']}>
      <AccountantButtons />
      <div className={classes['inventory__body']}>
        <div className={classes['inventory__left']}>
          <Input
            value={IIN}
            onChange = {(e) => setIIN(e.target.value)}
            name={''}
            label="ИИН"
          />
          <Input
            value={code}
            onChange = {(e) => setCode(e.target.value)}
            name={''}
            label="Номер заявки"
          />
          <div className="right">
            <Button variant={'tertiary'} onClick={handleSentClick}>
              {t('Результаты').toUpperCase()}
            </Button>
          </div>
        </div>
        {isFilled ? (<div className={classes['inventory__table']}>
          <EditableTable columns={columns} data={data} pairs={hashMap} />
        </div>) : (<div className={classes['inventory__textes']}><p>Пожалуйста, заполните поля слева.</p></div>)}
        
      </div>
    </main>
  );
};
