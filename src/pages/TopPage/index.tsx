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

  const menuButtons = [
    { label: '複文入力', pathname: '/sentenceInput' },
    { label: '複文表示', pathname: '/sentenceDisplay' },
  ];
  const menuButtonsNew = [
    { label: '文の形入力', pathname: '/sentenceFormInput' },
    { label: '文の形表示', pathname: '/sentenceFormPane' },
  ];
  const handleSignOut = () => {
    signOut(auth);
  };

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };

  return (
    <TopPageComponent
      menuButtons={menuButtons}
      menuButtonsNew={menuButtonsNew}
      handleSignOut={handleSignOut}
      handleNavigate={handleNavigate}
    />
  );
};
export default TopPage;
