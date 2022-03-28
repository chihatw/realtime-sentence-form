import { doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import sentenceParseNew2SentenceParseProps from 'sentence-parse-new2sentence-parse-props';

import { db } from '../repositories/firebase';

export type Word = {
  id: string;
  text: string;
  hinshi: string;
};

export type Sentence = {
  id: string;
  topic: string;
  comments: string[];
  shuuJoshi: string;
  juntaiJoshi: string;
  buntouSeibuns: string[];
  setsuzokuJoshis: { [id: string]: string };
  juntaiJoshiBunmatsu: string;
};

const INITIAL_SENTENCE: Sentence = {
  id: '',
  topic: '',
  comments: [],
  shuuJoshi: '',
  juntaiJoshi: '',
  buntouSeibuns: [],
  setsuzokuJoshis: {},
  juntaiJoshiBunmatsu: '',
};

export type Branch = {
  id: string;
  lock?: boolean;
  joshi:
    | {
        hasRentaiJoshi: boolean;
      }
    | {
        kakuJoshi: string;
        kakariJoshi: string;
      };
  unitID: string;
};

export type Unit = {
  id: string;
  wordID: string;
  branchIDs: string[];
};

export type ComplexSentence = {
  units: string;
  words: string;
  branches: string;
  sentences: string;
  sentenceArrays: string;
};

export type SentenceParseProps = {
  units: {
    [unitId: string]: {
      id: string;
      type: string;
      text: string;
      hinshi: string;
      branches: {
        lock: boolean;
        border: string;
        unitId: string;
        unitType: string;
        joshiLabels: string[];
        isDraggable: boolean;
        isCommentMeishi: boolean;
      }[];
      isTaigendome: boolean;
      parentUnitId: string;
      setsuzokuJoshi: string;
      parentBranchJoshi: string;
    };
  };
  sentences: {
    [sentenceId: string]: {
      id: string;
      color: string;
      bodyTexts: string[];
      shuuJoshi: string;
      buntouText: string;
      juntaiJoshi: string;
      topicUnitId: string;
      topicBranch: {
        lock: boolean;
        border: string;
        unitId: string;
        unitType: string;
        joshiLabels: string[];
        isDraggable: boolean;
        isCommentMeishi: boolean;
      } | null;
      isTaigendome: boolean;
      bunmatsuText: string;
      buntouSeibuns: {
        text: string;
        hinshi: string;
      }[];
      commentUnitIds: string[];
      juntaiJoshiBunmatsu: string;
    };
  };
  sentenceArrays: string[][];
};
export const INITIAL_SENTENE_PARSE_PROPS: SentenceParseProps = {
  units: {},
  sentences: {},
  sentenceArrays: [],
};

const DOC_ID = 'uouh1pOD69wjuapkoyBb';
const COLLECTION = 'complexSentences';
export const sentenceID = 'dummy';

const useComplexSentences = () => {
  const [globalWords, setGlobalWords] = useState<{ [id: string]: Word }>({});
  const [globalUnits, setGlobalUnits] = useState<{ [id: string]: Unit }>({});
  const [globalBranches, setGlobalBranches] = useState<{
    [id: string]: Branch;
  }>({});
  const [globalSentences, setGlobalSentences] = useState<{
    [id: string]: Sentence;
  }>({ [sentenceID]: { ...INITIAL_SENTENCE, id: sentenceID } });
  const [globalSentenceArrays, setGlobalSentenceArrays] = useState<string[][]>([
    [sentenceID],
  ]);
  const [activeSentenceID, setActiveSentenceID] = useState(sentenceID);
  const [sentenceParseProps, setSentenceParseProps] =
    useState<SentenceParseProps>({
      units: {},
      sentences: {},
      sentenceArrays: [],
    });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, COLLECTION, DOC_ID),
      (doc) => {
        console.log('snapshot complex sentence');

        if (!!doc && !!doc.data()) {
          const sentenceParseProps = sentenceParseNew2SentenceParseProps({
            units: JSON.parse(doc.data()!.units),
            words: JSON.parse(doc.data()!.words),
            branches: JSON.parse(doc.data()!.branches),
            sentences: JSON.parse(doc.data()!.sentences),
            sentenceArrays: JSON.parse(doc.data()!.sentenceArrays),
          });
          setSentenceParseProps(sentenceParseProps);
        }
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const sentenceParseProps = sentenceParseNew2SentenceParseProps({
      words: globalWords,
      units: globalUnits,
      branches: globalBranches,
      sentences: globalSentences,
      sentenceArrays: globalSentenceArrays,
    });
    setSentenceParseProps({ ...sentenceParseProps });
  }, [
    globalWords,
    globalUnits,
    globalBranches,
    globalSentences,
    globalSentenceArrays,
  ]);

  const updateComplexSentence = () => {
    const complexSentence: ComplexSentence = {
      units: JSON.stringify(globalUnits),
      words: JSON.stringify(globalWords),
      branches: JSON.stringify(globalBranches),
      sentences: JSON.stringify(globalSentences),
      sentenceArrays: JSON.stringify(globalSentenceArrays),
    };
    console.log('update complex sentence');
    updateDoc(doc(db, 'complexSentences', DOC_ID), complexSentence);
  };

  const clearComplexSentence = () => {
    setGlobalUnits({});
    setGlobalWords({});
    setGlobalBranches({});
    setGlobalSentences({ dummy: INITIAL_SENTENCE });
    setGlobalSentenceArrays([]);
  };

  const parseInputStr = (input: string) => {
    const {
      units,
      words,
      branches,
      sentences,
      sentenceArrays,
    }: {
      line: number;
      units: string;
      words: string;
      chinese: string;
      branches: string;
      japanese: string;
      sentences: string;
      sentenceArrays: string;
    } = JSON.parse(input);
    setGlobalUnits(JSON.parse(units));
    setGlobalWords(JSON.parse(words));
    setGlobalBranches(JSON.parse(branches));
    setGlobalSentences(JSON.parse(sentences));
    setGlobalSentenceArrays(JSON.parse(sentenceArrays));
  };

  return {
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
  };
};
export default useComplexSentences;
