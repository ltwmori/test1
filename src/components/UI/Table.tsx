import React, { useMemo } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { IGood, IRequest, IRequestInfo } from '../../ts/types';
import { Button } from './Button';
import classes from './Table.module.scss';

type PropsType = {
  item: IRequest;
  info: IRequestInfo;
  headers: string[];
  data: IGood[];
};

export const Table: React.FC<PropsType> = ({ item, headers, data, info }) => {
  const { t } = useTranslations();
  const totalPrice = useMemo(() => {
    return data.reduce((acc, item) => acc + item.price * item.totalAmount, 0);
  }, [data]);

  return (
    <div className={classes['table__container']}>
      <div className={classes['table__header-wrapper']}>
        <div className={classes['table__header']}>
          <div className={classes['table__info']}>
            <h2>{item.name}</h2>
            <h3>{item.organization}</h3>
          </div>
          <div className={classes['table__date']}>{item.date}</div>
        </div>
        <div className={classes['table__request-info']}>
          <h3>
            <b>{t('store')}:</b> {'AAA'}
          </h3>
          <h3>
            <b>{t('mol')}: </b> {'AAA'}
          </h3>
          <h3>
            <b>{t('executor')}: </b> {'AAA'}
          </h3>
          <h3>
            <b>{t('status')}: </b> {'AAA'}
          </h3>
        </div>
      </div>

      <table className={classes['table']}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={header} className={index === 2 ? classes['header__name'] : undefined}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Object.keys(item).map((key) => (
                <td key={key}>{item[key].toLocaleString()}</td>
              ))}
              <td>{(item.totalAmount * item.price).toLocaleString()}</td>
            </tr>
          ))}
          <tr className={classes['table__total']}>
            <td colSpan={7}>Итого</td>
            <td>{totalPrice.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <div className={classes['table__footer']}>
        <div className={classes['table__footer-buttons']}>
          <div className={classes['table__edit']}>{t('edit')}</div>
          <div className={classes['table__delete']}>{t('delete')}</div>
        </div>
        <Button
          variant={'tertiary'}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        >
          {t('send')}
        </Button>
      </div>
    </div>
  );
};
