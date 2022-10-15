import React, { useEffect } from 'react';
import classes from './Tooltip.module.scss';
import { Backdrop } from './Backdrop';
import { Portal } from './Portal';

type PropsType = {
  open: boolean;
  handleClose: () => void;
  targetId: string;
  children: React.ReactNode;
};

export const Tooltip: React.FC<PropsType> = ({ open, handleClose, targetId, children }) => {
  const container = document.getElementsByClassName(classes['tooltip'])[0] as HTMLElement;

  useEffect(() => {
    const container = document.getElementsByClassName(classes['tooltip'])[0] as HTMLElement;
    const targetElement = document.getElementById(targetId) as HTMLElement;
    container.style.position = 'absolute';
    container.style.top = `${targetElement.getBoundingClientRect().top}px`;
    container.style.right = `${window.innerWidth - targetElement.getBoundingClientRect().right}px`;
    container.style.opacity = '0';
  }, []);

  useEffect(() => {
    const container = document.getElementsByClassName(classes['tooltip'])[0] as HTMLElement;
    const targetElement = document.getElementById(targetId) as HTMLElement;
    const containerClient = container?.getBoundingClientRect();
    if (containerClient.height + containerClient.top + 50 > window.innerHeight) {
      container.style.top = `${
        containerClient.top - containerClient.height + targetElement.getBoundingClientRect().height
      }px`;
    }

    container.style.opacity = '1';
  }, [container?.getBoundingClientRect().height]);

  return open ? (
    <Portal className={classes['tooltip']}>
      <Backdrop handleOpen={handleClose} />
      {children}
    </Portal>
  ) : (
    <></>
  );
};
