import { SentenceFormInput } from '@chihatw/sentence-form.sentence-form-input';
import { SentenceFormPane } from '@chihatw/sentence-form.sentence-form-pane';
import { Container, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHandleSentenceForms } from '../../services/useSentenceForms';
import { FSentences } from 'fsentence-types';

const SentenceFormInputPage = () => {
  const { updateSentenceForm } = useHandleSentenceForms();
  const [sentences, setSentences] = useState<FSentences>({});

  const [input, setInput] = useState('');

  useEffect(() => {
    updateSentenceForm(sentences);
  }, [sentences]);

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 5 }}>
      <div style={{ display: 'grid', rowGap: 16 }}>
        <h1>文の形 入力</h1>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          multiline
        />
        <SentenceFormInput text={input} setSentences={setSentences} />
        <SentenceFormPane sentences={sentences} />
      </div>
    </Container>
  );
};

export default SentenceFormInputPage;
