import { SentenceInput } from './sentence-input';
import React, { useEffect, useState } from 'react';
import { INITIAL_SENTENCE, Sentence } from './entities/Sentence';
import { Unit } from './entities/Unit';
import { Branch } from './entities/Branch';
import { Word } from './entities/Word';
import {
  ComplexSentencePane,
  ComplexSentencePaneProps,
} from '@chihatw/sentence-form.complex-sentence-pane';
import sentenceParseNew2SentenceParseProps from 'sentence-parse-new2sentence-parse-props';

const sentenceID = 'dummy';

export const BasicSentenceInput = () => {
  const [globalSentences, setGlobalSentences] = useState<{
    [id: string]: Sentence;
  }>({ [sentenceID]: { ...INITIAL_SENTENCE, id: sentenceID } });
  const [globalUnits, setGlobalUnits] = useState<{ [id: string]: Unit }>({});
  const [globalBranches, setGlobalBranches] = useState<{
    [id: string]: Branch;
  }>({});
  const [globalWords, setGlobalWords] = useState<{ [id: string]: Word }>({});
  const [globalSentenceArrays, setGlobalSentenceArrays] = useState<string[][]>([
    [sentenceID],
  ]);
  const [activeSentenceID, setActiveSentenceID] = useState(sentenceID);

  const [sentenceParseProps, setSentenceParseProps] = useState<
    Omit<ComplexSentencePaneProps, 'Cursor'>
  >({
    units: {},
    sentences: {},
    sentenceArrays: [],
  });

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

  return (
    <>
      <SentenceInput
        sentenceID={sentenceID}
        globalUnits={globalUnits}
        globalWords={globalWords}
        setGlobalUnits={setGlobalUnits}
        setGlobalWords={setGlobalWords}
        globalBranches={globalBranches}
        globalSentences={globalSentences}
        activeSentenceID={activeSentenceID}
        setGlobalBranches={setGlobalBranches}
        setGlobalSentences={setGlobalSentences}
        setActiveSentenceID={setActiveSentenceID}
        globalSentenceArrays={globalSentenceArrays}
        setGlobalSentenceArrays={setGlobalSentenceArrays}
      />
      <div style={{ height: 60 }} />
      {sentenceParseProps.sentenceArrays.length && (
        <ComplexSentencePane
          Cursor={null}
          units={{ ...sentenceParseProps.units }}
          sentences={{ ...sentenceParseProps.sentences }}
          sentenceArrays={[...sentenceParseProps.sentenceArrays]}
        />
      )}
    </>
  );
};
