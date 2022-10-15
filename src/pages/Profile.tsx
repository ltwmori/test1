import React, { useState } from 'react';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';
import classes from './Profile.module.scss';
import { useUserContext } from '../contexts/UserContext';
import { useTranslations } from '../hooks/useTranslations';
import { removeTokens } from '../utils/token';

const Profile = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordCopy, setNewPasswordCopy] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { user } = useUserContext();
  const { t } = useTranslations();

  const handleOldPassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleNewPassCopyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordCopy(e.target.value);
  };

  const handleChangePassword = () => {
    if (newPasswordCopy !== newPassword) {
      setError('Пароли не идентичны');
    }
    if (oldPassword.length < 8) {
      setError('Старый пароль неверен');
    }
    if (newPassword.length < 8 || newPasswordCopy.length < 8) {
      setError('Новый пароль слишком короткий');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleChangePassword();
    }
  };

  const handleLogout = () => {
    removeTokens();
    window.location.href = '/auth';
  };

  return (
    <main className={classes['user__wrapper']}>
      <div className={classes['user__header']}>
        <img
          src="../assets/icons/profile-header.svg"
          alt="Profile icon"
          className={classes['user__avatar']}
        />
        <div>
          <p className={classes['user__name']}>
            {user.firstName} {user.lastName}
          </p>
          <p className={classes['user__position']}>{user.role}</p>
        </div>
      </div>
      <div className={classes['user__options']}>
        <p className={classes['user__option']}>{t('change_password')}</p>
        <p className={classes['user__option__logout']} onClick={handleLogout}>
          {t('logout')}
        </p>
      </div>
      <div className={classes['user__inputs']}>
        {error && <p className={classes['user__inputs__error']}>{error}</p>}
        <label className={classes['user__inputs__label']}>{t('old_password')}</label>
        <Input
          className={classes['user__input']}
          value={oldPassword}
          onChange={handleOldPassInputChange}
          name={'old-password'}
          type={'password'}
        />
        <label className={classes['user__inputs__label']}>{t('new_password')}</label>
        <Input
          className={classes['user__input']}
          value={newPassword}
          onChange={handleNewPassInputChange}
          name={'new-password'}
          type={'password'}
        />
        <label className={classes['user__inputs__label']}>{t('repeat_new_password')}</label>
        <Input
          className={classes['user__input']}
          value={newPasswordCopy}
          onChange={handleNewPassCopyInputChange}
          name={'new-password-copy'}
          type={'password'}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant={'primary'}
          onClick={handleChangePassword}
          className={classes['user__inputs__btn']}
        >
          {t('change_password')}
        </Button>
      </div>
    </main>
  );
};

export default Profile;
