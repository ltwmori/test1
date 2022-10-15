import React, { useEffect, useMemo, useRef } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

type Props = {
  id: string;
  children: React.ReactNode;
};

const HeaderPortal: React.FC<Props> = ({ id, children }) => {
  const element = useMemo(() => {
    return document.createElement('div');
  }, []);
  useEffect(() => {
    const root = document.getElementById(id)!;
    if (root) {
      root.appendChild(element);
      return () => {
        root.removeChild(element);
      };
    }
  }, []);
  return ReactDOM.createPortal(children, element);
};

export default HeaderPortal;
