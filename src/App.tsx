import React from 'react';
import { useAuth } from './services/useAuth';
import { AppContext } from './services/context';
import useOriginalTexts from './services/useOriginalTexts';
import useComplexSentences from './services/useComplexSentences';
import AppRoutes from './routes/AppRoutes';
import { useSentenceForms } from './services/useSentenceForms';

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
    setGlobalSentenceArrays,
  } = useComplexSentences();
  const { sentences } = useSentenceForms();
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
        setGlobalSentenceArrays,
        sentences,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
};

export default App;
