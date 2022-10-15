import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

type PropsType = {
  className?: string;
  children: React.ReactNode;
};

export const Portal: React.FC<PropsType> = ({ className, children }) => {
  const container = useMemo(() => {
    const el = document.createElement('div');
    el.className = className || '';
    return el;
  }, []);

  useEffect(() => {
    const body = document.body;

    body.appendChild(container);

    return () => {
      body.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};
