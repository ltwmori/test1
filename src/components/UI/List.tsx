import React, { useEffect, useRef, useState } from 'react';
import classes from './List.module.scss';
import classNames from 'classnames';

type PropsType = {
  title?: string;
  data: React.ReactNode[];
  withSections?: boolean;
  className?: string;
  getData?: (_: number) => Promise<any>;
};

export const List: React.FC<PropsType> = ({
  title,
  data,
  withSections = false,
  className,
  getData,
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (hasMore) {
      const lastElement = listRef.current?.lastChild as Element;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((p) => p + 1);
            observer.unobserve(entries[0].target);
          }
        },
        { threshold: 0.6 }
      );
      lastElement && observer.observe(lastElement);
      return () => observer.disconnect();
    }
  }, [data.length, hasMore]);

  useEffect(() => {
    if (getData) getData(page).then((length) => setHasMore(length !== 0));
  }, [page]);

  return (
    <div className={classes['list__container']}>
      {title && <h3 className={classes['list__title']}>{title}</h3>}
      <ul ref={listRef} className={classNames(classes['list'], className)}>
        {data}
      </ul>
    </div>
  );
};
