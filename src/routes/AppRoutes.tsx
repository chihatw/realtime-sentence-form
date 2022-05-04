import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SentenceDisplayPage from '../pages/SentenceDisplayPage';
import SentenceFormInputPage from '../pages/SentenceFormInputPage';
import SentenceFormPanePage from '../pages/SentenceFormPanePage';
import SentenceInputPage from '../pages/SentenceInputPage';
import SignInPage from '../pages/SignInPage';
import TopPage from '../pages/TopPage';
import { AppContext } from '../services/context';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TopPage />} />
      <Route path='/sentenceInput' element={<SentenceInputPage />} />
      <Route path='/sentenceDisplay' element={<SentenceDisplayPage />} />
      <Route path='/sentenceFormInput' element={<SentenceFormInputPage />} />
      <Route path='/sentenceFormPane' element={<SentenceFormPanePage />} />
      <Route
        path='/login'
        element={
          <GuestRoute>
            <SignInPage />
          </GuestRoute>
        }
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const { user, initializing } = useContext(AppContext);
  return !initializing ? user ? <Navigate to='/' /> : children : <></>;
};
