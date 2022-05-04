import { SentenceFormInput } from '@chihatw/sentence-form.sentence-form-input';
import { SentenceFormPane } from '@chihatw/sentence-form.sentence-form-pane';
import { Container, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHandleSentenceForms } from '../../services/useSentenceForms';
import { INITIAL_SENTENCE_FORM } from 'fsentence-types';

const SentenceFormInputPage = () => {
  const { updateSentenceForm } = useHandleSentenceForms();
  const [sentenceForm, setSentenceForm] = useState(INITIAL_SENTENCE_FORM);

  const [input, setInput] = useState('');

  useEffect(() => {
    updateSentenceForm(sentenceForm);
  }, [sentenceForm]);

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 5 }}>
      <div style={{ display: 'grid', rowGap: 16 }}>
        <h1>文の形 入力</h1>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          multiline
        />
        <SentenceFormInput text={input} setSentenceForm={setSentenceForm} />
        <SentenceFormPane sentences={sentenceForm.sentences} />
      </div>
    </Container>
  );
};

export default SentenceFormInputPage;
