import { SentenceFormPane } from '@chihatw/sentence-form.sentence-form-pane';
import React, { useContext } from 'react';
import { AppContext } from '../../services/context';

const SentenceFormPanePage = () => {
  const { sentenceForm } = useContext(AppContext);

  return (
    <div style={{ padding: 40 }}>
      <SentenceFormPane sentences={sentenceForm.sentences} />
    </div>
  );
};

export default SentenceFormPanePage;
