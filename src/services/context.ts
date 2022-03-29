import { createContext } from 'react';
import { User } from '@firebase/auth';

import { INITIAL_ORIGINAL_TEXT, OriginalText } from './useOriginalTexts';
import {
  Word,
  Unit,
  Branch,
  Sentence,
  SentenceParseProps,
  INITIAL_SENTENE_PARSE_PROPS,
} from './useComplexSentences';

export const AppContext = createContext<{
  user: User | null;
  initializing: boolean;
  originalText: OriginalText;
  updateOriginalText: (value: OriginalText) => void;
  globalWords: { [id: string]: Word };
  globalUnits: { [id: string]: Unit };
  globalBranches: { [id: string]: Branch };
  globalSentences: { [id: string]: Sentence };
  sentenceParseProps: SentenceParseProps;
  globalSentenceArrays: string[][];
  setGlobalWords: React.Dispatch<
    React.SetStateAction<{
      [id: string]: Word;
    }>
  >;
  setGlobalUnits: React.Dispatch<
    React.SetStateAction<{
      [id: string]: Unit;
    }>
  >;
  setGlobalBranches: React.Dispatch<
    React.SetStateAction<{
      [id: string]: Branch;
    }>
  >;
  setGlobalSentences: React.Dispatch<
    React.SetStateAction<{
      [id: string]: Sentence;
    }>
  >;
  clearComplexSentence: () => void;
  setGlobalSentenceArrays: React.Dispatch<React.SetStateAction<string[][]>>;
  parseInputStr: (value: string) => void;
  activeSentenceID: string;
  setActiveSentenceID: React.Dispatch<React.SetStateAction<string>>;
}>({
  user: null,
  initializing: true,
  originalText: INITIAL_ORIGINAL_TEXT,
  globalWords: {},
  globalUnits: {},
  globalBranches: {},
  globalSentences: {},
  activeSentenceID: '',
  sentenceParseProps: INITIAL_SENTENE_PARSE_PROPS,
  globalSentenceArrays: [],
  parseInputStr: () => {},
  setGlobalWords: () => {},
  setGlobalUnits: () => {},
  setGlobalBranches: () => {},
  setGlobalSentences: () => {},
  updateOriginalText: () => {},
  setActiveSentenceID: () => {},
  clearComplexSentence: () => {},
  setGlobalSentenceArrays: () => {},
});
