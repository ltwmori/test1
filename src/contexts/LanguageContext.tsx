import React, { createContext, useContext, useState } from 'react';
import { Language } from '../ts/types';
import { LANGUAGE } from '../consts/enums';

type ContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<ContextType>({ language: 'ru', setLanguage: () => {} });
export const useLanguageContext = (): ContextType => useContext(LanguageContext);

type PropsType = {
  children: React.ReactNode;
};

export const LanguageProvider: React.FC<PropsType> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem(LANGUAGE) as Language) || 'ru'
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
