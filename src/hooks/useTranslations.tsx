import React, { useCallback } from 'react';
import { useLanguageContext } from '../contexts/LanguageContext';
import { TRANSLATIONS } from '../consts/translations';

export const useTranslations = () => {
  const { language } = useLanguageContext();

  const t = useCallback(
    (key: string): string => {
      const translation = TRANSLATIONS.find((translation) => translation.key === key);
      return translation ? translation[language] : key;
    },
    [language]
  );

  return { t };
};
