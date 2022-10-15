import React from 'react';
import classes from './Button.module.scss';
import classNames from 'classnames';

type PropsType = {
  children: React.ReactNode;
  variant: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<PropsType> = ({
  variant,
  onClick,
  children,
  disabled,
  className,
}) => {
  return (
    <button
      className={classNames(classes['btn'], classes[`btn--${variant}`], className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
