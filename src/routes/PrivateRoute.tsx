import { Navigate } from 'react-router';
import React, { useContext } from 'react';

import { AppContext } from '../services/context';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, initializing } = useContext(AppContext);
  return !initializing ? user ? children : <Navigate to='/login' /> : <></>;
};

export default PrivateRoute;
