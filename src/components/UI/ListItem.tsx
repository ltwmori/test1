import React, { LegacyRef } from 'react';
import classes from './ListItem.module.scss';
import classNames from 'classnames';

type PropsType = {
  icon?: string;
  title: string;
  texts?: string[];
  actionIcon?: string;
  action?: () => void;
  actionFavIcon?: string;
  actionFav?: () => void;
  className?: string;
};

export const ListItem: React.FC<PropsType> = ({
  icon = '../../assets/icons/store.svg',
  title,
  texts = [],
  actionIcon = '../../assets/icons/edit-icon.svg',
  action,
  actionFavIcon = '../../assets/icons/star.svg',
  actionFav,
  className,
}) => {
  return (
    <li className={classNames(classes['item'], className)}>
      <img src={icon} alt="Item Icon" className={classes['item__icon']} />
      <div className={classes['item__text']}>
        <div className={classes['item__title']}>{title}</div>
        {texts.map((row, index) => (
          <div key={index}>{row}</div>
        ))}
      </div>
      {actionFav && (
        <img
          src={actionFavIcon}
          alt="Item action icon"
          className={classes['item__action-icon']}
          onClick={actionFav}
        />
      )}
      {action && (
        <img
          src={actionIcon}
          alt="Item action icon"
          className={classes['item__action-icon']}
          onClick={action}
        />
      )}
    </li>
  );
};
