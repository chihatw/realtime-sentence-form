import { useEffect, useMemo, useState } from 'react';
import {
  setDocument,
  snapshotDocument,
  updateDocument,
} from '../repositories/utils';
import { db } from '../repositories/firebase';
import { INITIAL_SENTENCE_FORM, SentenceForm } from 'fsentence-types';
import { DocumentData, Unsubscribe } from 'firebase/firestore';

const COLLECTION = 'sentenceForms';
const SENTENCE_FORM_DOC_ID = 'sentenceForm';

export const useSentenceForms = () => {
  const [sentenceForm, setSentenceForm] = useState(INITIAL_SENTENCE_FORM);

  const _snapshotDocument = useMemo(
    () =>
      function <T>({
        id,
        initialValue,
        setValue,
        buildValue,
      }: {
        id: string;
        initialValue: T;
        setValue: (value: T) => void;
        buildValue: (value: DocumentData) => T;
      }): Unsubscribe {
        return snapshotDocument({
          db,
          id,
          colId: COLLECTION,
          initialValue,
          setValue,
          buildValue,
        });
      },
    []
  );
  useEffect(() => {
    const unsub = _snapshotDocument({
      id: SENTENCE_FORM_DOC_ID,
      initialValue: INITIAL_SENTENCE_FORM,
      setValue: setSentenceForm,
      buildValue: buildSentenceForm,
    });
    return () => {
      unsub();
    };
  }, []);
  return { sentenceForm };
};
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

const buildSentenceForm = (doc: DocumentData) => {
  const sentenceForm: SentenceForm = doc.data().sentenceForm;
  return sentenceForm;
};
