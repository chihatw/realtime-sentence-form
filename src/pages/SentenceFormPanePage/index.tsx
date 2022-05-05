import { SentenceFormPane } from '@chihatw/sentence-form.sentence-form-pane';
import React, { useContext } from 'react';
import { AppContext } from '../../services/context';

const SentenceFormPanePage = () => {
  const { sentences } = useContext(AppContext);

  return (
    <div style={{ padding: 40 }}>
      <SentenceFormPane sentences={sentences} />
    </div>
  );
};

export default SentenceFormPanePage;
