import React from 'react';
import classes from './Tabs.module.scss';
import classNames from 'classnames';
import { useTranslations } from '../../hooks/useTranslations';

type PropsType = {
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Tabs: React.FC<PropsType> = ({ options, value, onChange, className }) => {
  const { t } = useTranslations();
  return (
    <ul className={classes['radio__options']}>
      {options.map((option, index) => (
        <li key={option} className={classes['radio__option']}>
          <input
            type="radio"
            id={option}
            className={classNames(classes['radio__input'], className)}
            name={option}
            value={option}
            onChange={onChange}
            checked={option === value}
          />
          <label htmlFor={option} className={classes['radio__label']}>
            {t(option)}
          </label>
        </li>
      ))}
    </ul>
  );
};
