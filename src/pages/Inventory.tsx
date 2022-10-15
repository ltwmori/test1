import React, { useCallback, useEffect, useState } from 'react';
import classes from './Inventory.module.scss';
import { AccountantButtons } from '../components/accountant/AccountantButtons';
import { Dropdown } from '../components/UI/Dropdown';
import { ButtonsHeader } from '../components/UI/ButtonsHeader';
import { EditableTable } from '../components/UI/EditableTable';
import { IColumn } from '../components/UI/GlobalTable';
import { IEmployee, IStore } from '../ts/types';

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

const data = [
  {
    number: 1,
    product_code: '00154ZS',
    product_name: 'Ноутбук ASUS',
    unit: 'шт.',
    quantity_fact: 99,
    quantity_account: 100,
    quantity_package_fact: 1,
    quantity_package_account: 1,
    price_for_unit: 50000,
    total_sum_fact: 4950000,
    total_sum_account: 5000000,
  },
  {
    number: 2,
    product_code: '05154FE',
    product_name: 'Мышка HP',
    unit: 'шт.',
    quantity_fact: 20,
    quantity_account: 20,
    quantity_package_fact: 1,
    quantity_package_account: 1,
    price_for_unit: 7000,
    total_sum_fact: 140000,
    total_sum_account: 140000,
  },
  {
    number: 3,
    product_code: '43554XW',
    product_name: 'Клавиатура Hyper X',
    unit: 'шт.',
    quantity_fact: 10,
    quantity_account: 10,
    quantity_package_fact: 1,
    quantity_package_account: 1,
    price_for_unit: 10000,
    total_sum_fact: 10000,
    total_sum_account: 100000,
  },
];

const Inventory = () => {
  const [docType, setDocType] = useState<string>(docTypes[0]);
  const [store, setStore] = useState<string | undefined>(undefined);
  const [commision, setCommission] = useState<string | undefined>(undefined);
  const [responsible, setResponsible] = useState<string | undefined>(undefined);

  const [filterStore, setFilterStore] = useState<IStore[]>([]);
  const [filterEmployee, setFilterEmployee] = useState<IEmployee[]>([]);

  const getEmployees = useCallback((namePart = '', page = 0) => {
    return getFilterEmployeeList(namePart, page).then(({ data }) => {
      const list = page === 0 ? data.content : (prev: IEmployee[]) => [...prev, ...data.content];
      setFilterEmployee(list);
      return data.totalPages;
    });
  }, []);

  const getStores = useCallback((namePart = '', page = 0) => {
    return getFilterStoreList(namePart, page).then(({ data }) => {
      const list = page === 0 ? data.content : (prev: IStore[]) => [...prev, ...data.content];
      setFilterStore(list);
      return data.totalPages;
    });
  }, []);

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
            handleDataChange={() => {
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
              getData={getStores}
            />
            <p className={classes['address']}>г.Астана, ул.Мангилик ел, 53, Блок 1, подъезд 5</p>
          </div>
          <Dropdown
            options={filterEmployee}
            placeholder={'Члены комиссии'}
            onChange={setCommission}
            selectedOption={commision}
            label={'Члены Комиссии'}
            getData={getEmployees}
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

export default Inventory;
