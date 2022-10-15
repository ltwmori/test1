import React from 'react';
import classes from './Backdrop.module.scss';

interface IProps {
  children?: React.ReactNode;
  handleOpen: () => void;
}

export const Backdrop: React.FC<IProps> = ({ handleOpen, children }) => {
  return (
    <div className={classes['backdrop']} onClick={handleOpen}>
      {children}
    </div>
  );
};
