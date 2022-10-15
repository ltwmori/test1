import React from 'react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { Language } from '../../ts/types';
import classes from './SelectLanguage.module.scss';
import classNames from 'classnames';
import { LANGUAGE } from '../../consts/enums';

type LanguageType = {
  name: string;
  key: Language;
};
const LANGUAGES: LanguageType[] = [
  {
    name: 'Қазақша',
    key: 'kz',
  },
  {
    name: 'Русский',
    key: 'ru',
  },
  {
    name: 'English',
    key: 'en',
  },
];

export const SelectLanguage: React.FC = () => {
  const { language, setLanguage } = useLanguageContext();

  const handleLanguageSelect = (language: LanguageType) => {
    setLanguage(language.key);
    localStorage.setItem(LANGUAGE, language.key);
  };

  return (
    <ul className={classes['select']}>
      {LANGUAGES.map((lang) => (
        <li
          key={lang.key}
          onClick={() => handleLanguageSelect(lang)}
          className={
            language === lang.key
              ? classNames(classes['item'], classes['item--selected'])
              : classes['item']
          }
        >
          {lang.name}
        </li>
      ))}
    </ul>
  );
};
