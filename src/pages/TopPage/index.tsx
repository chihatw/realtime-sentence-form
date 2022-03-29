import React, { useMemo } from 'react';
import { signOut } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../repositories/firebase';
import TopPageComponent from './components/TopPageComponent';

export type MenuButton = {
  label: string;
  pathname?: string;
};

const TopPage = () => {
  const navigate = useNavigate();

  const menuButtons: MenuButton[] = useMemo(
    () => [
      { label: '復文入力', pathname: '/sentenceInput' },
      { label: '復文表示', pathname: '/sentenceDisplay' },
    ],
    []
  );

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };

  return (
    <TopPageComponent
      menuButtons={menuButtons}
      handleSignOut={handleSignOut}
      handleNavigate={handleNavigate}
    />
  );
};
export default TopPage;
