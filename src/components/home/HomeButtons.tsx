import React from 'react';
import classes from './HomeButtons.module.scss';
import { Button } from '../UI/Button';

export const HomeButtons: React.FC = () => {
  const handleProfileButton = () => {};
  const handleAddUserButton = () => {};
  const handleAddCategoryButton = () => {};
  const handleAddItemButton = () => {};
  const handleAddStoreButton = () => {};

  return (
    <div className={classes['buttons']}>
      <Button variant="secondary" onClick={handleProfileButton}>
        <img src="../../assets/icons/profile-dark.svg" alt="Profile icon" />
        Профиль
      </Button>
      <Button variant="secondary" onClick={handleAddUserButton}>
        <img src="../../assets/icons/add-user.svg" alt="Add user icon" />
        Добавить пользователя
      </Button>
      <Button variant="secondary" onClick={handleAddCategoryButton}>
        <img src="../../assets/icons/add-icon.svg" alt="Add icon" />
        Добавить категорию
      </Button>
      <Button variant="secondary" onClick={handleAddItemButton}>
        <img src="../../assets/icons/add-icon.svg" alt="Add icon" />
        Добавить товар
      </Button>
      <Button variant="secondary" onClick={handleAddStoreButton}>
        <img src="../../assets/icons/add-icon.svg" alt="Add icon" />
        Добавить склад
      </Button>
    </div>
  );
};
