import React from 'react';
import classes from './Checkbox.module.scss';

type PropsType = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export const Checkbox: React.FC<PropsType> = ({ checked, onChange, name }) => {
  return (
    <input
      type="checkbox"
      name={name}
      className={classes['checkbox']}
      checked={checked}
      onChange={onChange}
    />
  );
};
