import React, { useState } from 'react';
import classes from './Inventory.module.scss';
import { Dropdown } from '../components/UI/Dropdown';
import { ButtonsHeader } from '../components/UI/ButtonsHeader';
import { EditableTable } from '../components/UI/EditableTable';
import { IColumn } from '../components/UI/GlobalTable';
import { IEmployee, IStore } from '../ts/types';
import { AccountantButtons } from '../components/accountant/AccountantButtons';
import { data } from '../consts/data';

const docTypes = ['Ведомость', 'Табель', 'Отчет', 'Квитанция'];

const hashMap = new Map();
hashMap.set('quantity_fact', 'quantity_account');
hashMap.set('total_sum_fact', 'total_sum_account');

const columns: IColumn[] = [
  { dataIndex: 'number', sorter: false },
  { dataIndex: 'product_code', sorter: true },
  { dataIndex: 'product_name', sorter: true },
  { dataIndex: 'unit', sorter: false },
  { dataIndex: 'quantity_fact', sorter: false },
  { dataIndex: 'quantity_account', sorter: false },
  { dataIndex: 'quantity_package_fact', sorter: false },
  { dataIndex: 'quantity_package_account', sorter: false },
  { dataIndex: 'price_for_unit', sorter: true },
  { dataIndex: 'total_sum_fact', sorter: true },
  { dataIndex: 'total_sum_account', sorter: false },
];

export const Home = () => {
  const [docType, setDocType] = useState<string>(docTypes[0]);
  const [store, setStore] = useState<string | undefined>(undefined);
  const [commision, setCommission] = useState<string | undefined>(undefined);
  const [responsible, setResponsible] = useState<string | undefined>(undefined);

  const [filterStore, setFilterStore] = useState<IStore[]>([]);
  const [filterEmployee, setFilterEmployee] = useState<IEmployee[]>([]);

  return (
    <main className={classes['inventory']}>
      <AccountantButtons />
      <div className={classes['inventory__body']}>
        <div className={classes['inventory__head']}>
          <ButtonsHeader
            handleSaveClick={() => {
              return;
            }}
            handleCancelClick={() => {
              return;
            }}
            handleDeleteClick={() => {
              return;
            }}
            handleSentClick={() => {
              return;
            }}
          />
        </div>
        <div className={classes['inventory__left']}>
          <Dropdown
            options={docTypes}
            placeholder={'Вид документа'}
            onChange={setDocType}
            withSearch={false}
            selectedOption={docType}
            label={'Вид документа'}
          />
          <div>
            <Dropdown
              options={filterStore}
              placeholder={'Выберите склад'}
              onChange={setStore}
              selectedOption={store}
              label={'Выберите склад'}
            />
            <p className={classes['address']}>г.Астана, ул.Мангилик ел, 53, Блок 1, подъезд 5</p>
          </div>
          <Dropdown
            options={filterEmployee}
            placeholder={'Члены комиссии'}
            onChange={setCommission}
            selectedOption={commision}
            label={'Члены Комиссии'}
          />
          <Dropdown
            options={filterEmployee}
            placeholder={'Ответственные лица'}
            onChange={setResponsible}
            selectedOption={responsible}
            label={'Ответственные лица'}
          />
        </div>
        <div className={classes['inventory__table']}>
          <EditableTable
            columns={columns}
            data={data}
            footerColumns={[
              'quantity_fact',
              'quantity_account',
              'total_sum_fact',
              'total_sum_account',
            ]}
            pairs={hashMap}
          />
        </div>
      </div>
    </main>
  );
};
