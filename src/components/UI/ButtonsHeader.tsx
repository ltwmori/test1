import React, { useState } from 'react';
import { Button } from './Button';
import classes from './ButtonsHeader.module.scss';
import { Dropdown } from './Dropdown';
import Calendarik from './Calendarik';
import { useTranslations } from '../../hooks/useTranslations';
import { Input } from './Input';

interface IButtonsHeaderProps {
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  handleDeleteClick: () => void;
  handleSentClick: () => void;
}

export const ButtonsHeader: React.FC<IButtonsHeaderProps> = ({
  handleSaveClick,
  handleCancelClick,
  handleDeleteClick,
  handleSentClick,
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const { t } = useTranslations();
  return (
    <div className={classes['header']}>
      <div className={classes['header__left']}>
        
        <Calendarik date={date} setDate={setDate} />
      </div>
      <div className={classes['header__right']}>
        <div className={classes['header__dropdown']}>
          <Dropdown
            options={['exel', 'png', 'pdf']}
            placeholder={t('export_to')}
            withSearch={false}
            onChange={() => {
              return;
            }}
            classname={'without-border'}
          />
        </div>
        <div className={classes['header__save']} onClick={handleSaveClick}>
          {t('save')}
        </div>
        <div className={classes['header__cancel']} onClick={handleCancelClick}>
          {t('cancel')}
        </div>
        <div className={classes['header__delete']} onClick={handleDeleteClick}>
          {t('delete')}
        </div>
        <div className={classes['header__button']}>
          <Button variant={'tertiary'} onClick={handleSentClick}>
            {t('send').toUpperCase()}
          </Button>
        </div>
      </div>
    </div>
  );
};
