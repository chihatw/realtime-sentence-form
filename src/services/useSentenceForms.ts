import { useEffect, useMemo, useState } from 'react';
import {
  setDocument,
  snapshotDocument,
  updateDocument,
} from '../repositories/utils';
import { db } from '../repositories/firebase';
import { FSentences } from 'fsentence-types';
import { DocumentData, Unsubscribe } from 'firebase/firestore';

const COLLECTION = 'sentenceForms';
const SENTENCE_FORM_DOC_ID = 'sentenceForm';

export const useSentenceForms = () => {
  const [sentences, setSentences] = useState<FSentences>({});

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
      initialValue: {},
      setValue: setSentences,
      buildValue: buildSentences,
    });
    return () => {
      unsub();
    };
  }, []);
  return { sentences };
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
  const setSentenceForm = async (sentences: FSentences) => {
    return _setDocument({ id: SENTENCE_FORM_DOC_ID, sentences });
  };
  const updateSentenceForm = async (sentences: FSentences) => {
    return _updateDocument({ id: SENTENCE_FORM_DOC_ID, sentences });
  };
  return { setSentenceForm, updateSentenceForm };
};

const buildSentences = (doc: DocumentData) => {
  const sentences: FSentences = doc.data().sentences;
  return sentences;
};
