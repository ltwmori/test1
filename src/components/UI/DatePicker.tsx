import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { ru, enUS, kk } from 'date-fns/locale';
import { Backdrop } from './Backdrop';
import classes from './DatePicker.module.scss';

const DatePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={classes['dropdown']}>
      {isOpen ? (
        <>
          <Backdrop handleOpen={handleOpen} />
          <DateRange
            className={classes['dropdown__body']}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            locale={ru}
            dateDisplayFormat="dd.MM.yyyy"
            startDatePlaceholder=""
            endDatePlaceholder=""
            staticRanges={[]}
            inputRanges={[]}
          />
        </>
      ) : (
        <div className={classes['dropdown__header']} onClick={handleDropdownClick}>
          <img
            src={'../../assets/icons/calendar.svg'}
            alt={'calendar'}
            className={classes['dropdown__header__calendar-icon']}
          />
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

export default DatePicker;
