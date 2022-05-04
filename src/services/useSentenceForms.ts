import { useMemo } from 'react';
import { setDocument, updateDocument } from '../repositories/utils';
import { db } from '../repositories/firebase';
import { SentenceForm } from 'fsentence-types';

const COLLECTION = 'sentenceForms';
const SENTENCE_FORM_DOC_ID = 'sentenceForm';

export const useSentenceForms = () => {};
export const useHandleSentenceForms = () => {
  const _setDocument = useMemo(
    () =>
      async function <T extends { id: string }>(value: T) {
        return await setDocument({ db, colId: COLLECTION, value });
      },
    []
  );
  const _updateDocument = useMemo(
    () =>
      async function <T extends { id: string }>(value: T) {
        return await updateDocument({ db, colId: COLLECTION, value });
      },
    []
  );
  const setSentenceForm = async (sentenceForm: SentenceForm) => {
    return _setDocument({ id: SENTENCE_FORM_DOC_ID, sentenceForm });
  };
  const updateSentenceForm = async (sentenceForm: SentenceForm) => {
    return _updateDocument({ id: SENTENCE_FORM_DOC_ID, sentenceForm });
  };
  return { setSentenceForm, updateSentenceForm };
};
