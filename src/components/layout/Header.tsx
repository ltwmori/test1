import React from 'react';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { SelectLanguage } from './SelectLanguage';

export const Header: React.FC = () => {
  return (
    <header className={classes['header']}>
      <div id={'header__container'} className={classes['header__container']}>
        <div className={classes['header__title']}>
          <img
            src={require('../../assets/img/logo.png')}
            alt="logo"
            className={classes['header__img']}
          />
        </div>
      </div>
      <SelectLanguage />
      <Link to={'/profile'} className={classes['link']}>
        <div className={classes['header__profile']}>
          <div className={classes['profile__info']}>
            <div className={classes['profile__name']}>{`Guest`}</div>
          </div>
          <img
            src="../assets/icons/profile-header.svg"
            alt="Profile icon"
            className={classes['profile__avatar']}
          />
        </div>
      </Link>
    </header>
  );
};
