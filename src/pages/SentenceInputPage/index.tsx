import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import React, { useContext, useEffect, useRef } from 'react';

import TextInputPane from './components/TextInputPane';
import { AppContext } from '../../services/context';
import { sentenceID } from '../../services/useComplexSentences';
import { ComplexSentencePane } from '../../components/complex-sentence-pane';
import { ComplexSentenceInput } from '../../components/complex-sentence-input';

const SentenceInputPage = () => {
  const {
    globalWords,
    globalUnits,
    globalBranches,
    globalSentences,
    activeSentenceID,
    sentenceParseProps,
    globalSentenceArrays,
    setGlobalWords,
    setGlobalUnits,
    setGlobalBranches,
    setGlobalSentences,
    setActiveSentenceID,
    setGlobalSentenceArrays,
  } = useContext(AppContext);

  const navitage = useNavigate();

  const handleBack = () => {
    navitage('/');
  };

  return (
    <div>
      <Container maxWidth='md'>
        <div style={{ backgroundColor: 'white', borderRadius: 8 }}>
          <div
            style={{
              rowGap: 16,
              display: 'grid',
              paddingTop: 16,
              paddingBottom: 160,
            }}
          >
            <div style={{ color: '#555', fontSize: 24 }}>複文入力</div>
            <div>
              <Button variant='contained' onClick={handleBack}>
                戻る
              </Button>
            </div>
            <TextInputPane />
            <ComplexSentenceInput
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
            {!!sentenceParseProps.sentenceArrays.length && (
              <div>
                <ComplexSentencePane
                  Cursor={null}
                  units={sentenceParseProps.units}
                  sentences={sentenceParseProps.sentences}
                  sentenceArrays={sentenceParseProps.sentenceArrays}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SentenceInputPage;
