import React from 'react';
import { useAuth } from './services/useAuth';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import TopPage from './pages/TopPage';
import GuestRoute from './routes/GuestRoute';
import SignInPage from './pages/SignInPage';
import PrivateRoute from './routes/PrivateRoute';
import { AppContext } from './services/context';
import useOriginalTexts from './services/useOriginalTexts';
import SentenceInputPage from './pages/SentenceInputPage';
import SentenceDisplayPage from './pages/SentenceDisplayPage';
import useComplexSentences from './services/useComplexSentences';

const App = () => {
  const { initializing, user } = useAuth();
  const { originalText, updateOriginalText } = useOriginalTexts();
  const {
    globalWords,
    globalUnits,
    globalBranches,
    globalSentences,
    activeSentenceID,
    sentenceParseProps,
    globalSentenceArrays,
    parseInputStr,
    setGlobalWords,
    setGlobalUnits,
    setGlobalBranches,
    setGlobalSentences,
    setActiveSentenceID,
    clearComplexSentence,
    updateComplexSentence,
    setGlobalSentenceArrays,
  } = useComplexSentences();
  return (
    <AppContext.Provider
      value={{
        user,
        initializing,
        originalText,
        globalWords,
        globalUnits,
        globalBranches,
        globalSentences,
        activeSentenceID,
        sentenceParseProps,
        globalSentenceArrays,
        parseInputStr,
        setGlobalWords,
        setGlobalUnits,
        setGlobalBranches,
        setGlobalSentences,
        updateOriginalText,
        setActiveSentenceID,
        clearComplexSentence,
        updateComplexSentence,
        setGlobalSentenceArrays,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <TopPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/sentenceInput'
            element={
              <PrivateRoute>
                <SentenceInputPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/sentenceDisplay'
            element={
              <PrivateRoute>
                <SentenceDisplayPage />
              </PrivateRoute>
            }
          />
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
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
