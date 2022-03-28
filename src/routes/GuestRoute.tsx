import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContext } from '../services/context';

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const { user, initializing } = useContext(AppContext);
  return !initializing ? user ? <Navigate to='/' /> : children : <></>;
};

export default GuestRoute;
