import classes from './AccountantButtons.module.scss';
import React from 'react';
import { Button } from '../UI/Button';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import BoxIcon from '../../assets/icons/js/BoxIcon';
import DocumentIcon from '../../assets/icons/js/DocumentIcon';
import CheckListIcon from '../../assets/icons/js/CheckListIcon';

export const AccountantButtons: React.FC = () => {
  return (
    <div className={classes['buttons']}>
      <NavLink
        to={'/home'}
        className={({ isActive }) =>
          isActive ? classNames(classes['link'], classes['link--active']) : classes['link']
        }
      >
        <Button
          variant="secondary"
          onClick={() => {
            console.log('clicked');
          }}
        >
          <img src="../../assets/icons/document.svg" alt="Document icon" />
          Реузльтаты анализов
        </Button>
      </NavLink>
      <NavLink
        to={'/patient'}
        className={({ isActive }) =>
          isActive ? classNames(classes['link'], classes['link--active']) : classes['link']
        }
      >
        <Button
          variant="secondary"
          onClick={() => {
            console.log('clicked');
          }}
        >
          <DocumentIcon />
          Кабинет пациента
        </Button>
      </NavLink>
      <NavLink
        to={'/doctor'}
        className={({ isActive }) =>
          isActive ? classNames(classes['link'], classes['link--active']) : classes['link']
        }
      >
        <Button
          variant="secondary"
          onClick={() => {
            console.log('clicked');
          }}
        >
          <DocumentIcon />
          Кабинет врача
        </Button>
      </NavLink>
      <NavLink
        to={'/partner'}
        className={({ isActive }) =>
          isActive ? classNames(classes['link'], classes['link--active']) : classes['link']
        }
      >
        <Button variant="secondary">
          <BoxIcon />
          Кабинет партнера
        </Button>
      </NavLink>
      <NavLink
        to={'/employee'}
        className={({ isActive }) =>
          isActive ? classNames(classes['link'], classes['link--active']) : classes['link']
        }
      >
        <Button
          variant="secondary"
          onClick={() => {
            console.log('clicked');
          }}
        >
          <CheckListIcon />
          Кабинет сотрудника
        </Button>
      </NavLink>
    </div>
  );
};
