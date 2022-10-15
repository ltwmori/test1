import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './Dropdown.module.scss';
import { Search } from './Search';
import classNames from 'classnames';
import DropdownPortal from './DropdownPortal';
import { useDebounce } from '../../hooks/useDebounce';

interface IProps {
  options: any[]; // change later;
  placeholder: string;
  withSearch?: boolean;
  classname?: string;
  onChange: (option: string) => void;
  selectedOption?: string;
  label?: string;
  getData?: (query: string, page: number) => Promise<any>;
}

export const Dropdown: React.FC<IProps> = ({
  options,
  placeholder,
  withSearch = true,
  classname = '',
  onChange,
  selectedOption,
  label,
  getData,
}) => {
  const usePrevious = <T,>(value: T) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = JSON.parse(JSON.stringify(value));
    }, [value]);

    return ref.current;
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [query, setQuery] = useState<string>('');
  const [optionList, setOptionList] = useState<any[]>([]);
  const deboucedSearch = useDebounce(query, 1000);
  const prevQuery = usePrevious(deboucedSearch);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
    onChange(query);
  };

  const isArrayStrings = (value: unknown): value is string[] => {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
  };

  useEffect(() => {
    if (options && options.length) {
      if (isArrayStrings(options)) {
        setOptionList(options.map((item, index) => ({ id: index, name: item })));
        return;
      }
      setOptionList(options);
    }
  }, [options]);

  useEffect(() => {
    const found = optionList.find((elem) => elem.name === selectedOption);
    if (found) {
      setSelectedItemIndex(found.id);
    }
  }, [selectedOption, optionList]);

  const lastRef = useCallback(
    (list: HTMLUListElement) => {
      setTimeout(() => {
        const lastElement = list?.lastChild as Element;
        if (hasMore && lastElement) {
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
      }, 500);
    },
    [optionList.length]
  );

  useEffect(() => {
    if (getData) {
      getData(deboucedSearch, page).then((totalPages) => {
        setHasMore(page + 1 < totalPages);
      });
    }
  }, [page]);

  useEffect(() => {
    if (getData) {
      if (page !== 0) {
        setPage(0);
      } else if (prevQuery !== undefined && prevQuery !== deboucedSearch) {
        getData(deboucedSearch, page).then((totalPages) => {
          setHasMore(page + 1 < totalPages);
        });
      }
    }
  }, [deboucedSearch]);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
    setQuery('');
    setIsOpen(false);
    onChange(options.find((option) => option.id === index)?.name || '');
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    setQuery('');
  };

  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  return (
    <div className={classes['dropdown']}>
      {label && <div className={classes['dropdown__label']}>{label}</div>}
      <div
        className={classNames(classes['dropdown__header'], classes[classname])}
        onClick={handleDropdownClick}
        id={isOpen ? 'dropdown__header' : undefined}
      >
        <div
          className={classNames(
            classes[`dropdown__header-title${selectedItemIndex !== -1 ? '-active' : ''}`],
            classes[classname]
          )}
        >
          {optionList.find((option) => option.id === selectedItemIndex)?.name || placeholder}
        </div>
        <div className={classes['dropdown__header-icon']}>
          <img src="../../assets/icons/down-arrow.svg" alt="down-arrow" />
        </div>
      </div>
      {isOpen && (
        <React.Fragment key={'dropdown'}>
          <DropdownPortal
            open={isOpen}
            handleClose={() => {
              handleOpen();
            }}
            targetId={'dropdown__header'}
          >
            <div className={classes[`dropdown__body`]}>
              {withSearch && (
                <div className={classes[`dropdown__search`]}>
                  <Search onChange={handleSearchChange} />
                </div>
              )}
              <ul className={classes['dropdown__list']} ref={lastRef}>
                {optionList
                  .filter((val) => {
                    if (getData) {
                      return val;
                    }
                    if (query === '') {
                      return val.name;
                    } else if (val.name.toLowerCase().includes(query.toLowerCase())) {
                      return val.name.toLowerCase().includes(query.toLowerCase());
                    }
                  })
                  .map((option) => (
                    <li
                      className={classNames(
                        classes[
                          `dropdown__body-item${selectedItemIndex === option.id ? '--active' : ''}`
                        ],
                        classes['dropdown__body-item']
                      )}
                      key={option.id}
                      onClick={() => handleItemClick(option.id)}
                    >
                      {option.name}
                    </li>
                  ))}
              </ul>
            </div>
          </DropdownPortal>
        </React.Fragment>
      )}
    </div>
  );
};
