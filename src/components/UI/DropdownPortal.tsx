import React, { useEffect, useRef } from 'react';
import classes from './Dropdown.module.scss';
import { Backdrop } from './Backdrop';
import { Portal } from './Portal';

type PropsType = {
  open: boolean;
  handleClose: () => void;
  targetId: string;
  children: React.ReactNode;
};

const DropdownPortal: React.FC<PropsType> = ({ open, handleClose, targetId, children }) => {
  const container = document.getElementsByClassName(classes['tooltip'])[0] as HTMLElement;

  useEffect(() => {
    const container = document.getElementsByClassName(classes['tooltip'])[0] as HTMLElement;
    const targetElement = document.getElementById(targetId) as HTMLElement;
    container.style.position = 'absolute';
    container.style.top = `${targetElement.getBoundingClientRect().top}px`;
    container.style.left = `${targetElement.getBoundingClientRect().left}px`;
    container.style.width = `${targetElement.getBoundingClientRect().width}px`;
    container.style.height = `${targetElement.getBoundingClientRect().height}px`;
    container.style.opacity = '0';
  }, [container]);

  useEffect(() => {
    const container = document.getElementsByClassName(classes['tooltip'])[0] as HTMLElement;
    const dropdown = container.getElementsByTagName('div')[1];
    const targetElement = document.getElementById(targetId) as HTMLElement;
    const containerClient = container?.getBoundingClientRect();
    if (dropdown.getBoundingClientRect().height + containerClient.top + 100 > window.innerHeight) {
      container.style.top = `${
        containerClient.top -
        dropdown.getBoundingClientRect().height +
        targetElement.getBoundingClientRect().height
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

export default DropdownPortal;
