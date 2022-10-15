import React from 'react';
import { Header } from './Header';
import classes from './Layout.module.scss';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className={classes['layout']}>
      <Header />
      <Outlet />
    </div>
  );
};
