import React, { useState } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import classes from './Search.module.scss';

type PropsType = {
  onChange: (query: string) => void;
  label?: string;
  placeholder?: string;
};

export const Search: React.FC<PropsType> = ({ onChange, label, placeholder }) => {
  const { t } = useTranslations();
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    onChange(value);
  };

  return (
    <div className={classes['search__container']}>
      {label && <div className={classes['search__label']}>{label}</div>}
      <input
        type="search"
        placeholder={placeholder ? placeholder : t('search')}
        value={query}
        onChange={handleInputChange}
        className={classes['search']}
      />
    </div>
  );
};
