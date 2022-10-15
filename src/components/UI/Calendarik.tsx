import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import classes from './Calendarik.module.scss';
import { Backdrop } from './Backdrop';
import { Calendar } from 'react-date-range';
import { ru } from 'date-fns/locale';

type Props = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
};

const Calendarik: React.FC<Props> = ({ date, setDate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={classes['dropdown']}>
      {isOpen ? (
        <React.Fragment key={'dropdown'}>
          <Backdrop handleOpen={handleOpen} />
          <Calendar
            className={classes['dropdown__body']}
            onChange={(item: Date) => setDate(item)}
            locale={ru}
            date={date}
          />
        </React.Fragment>
      ) : (
        <div className={classes['dropdown__header']} onClick={handleDropdownClick}>
          <img
            src={'../../assets/icons/calendar.svg'}
            alt={'calendar'}
            className={classes['dropdown__header__calendar-icon']}
          />
          {date ? (
            <p className={classes['dropdown__header__title']}>{`${date.toLocaleDateString(
              'ru-RU'
            )}`}</p>
          ) : (
            <p className={classes['dropdown__header__placeholder']}>Выберите дату</p>
          )}
          <img
            src="../../assets/icons/down-arrow.svg"
            alt="down-arrow"
            className={classes['dropdown__header-icon']}
          />
        </div>
      )}
    </div>
  );
};

export default Calendarik;
