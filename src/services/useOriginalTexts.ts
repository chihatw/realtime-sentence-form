import { doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

export type OriginalText = {
  text: string;
  chinese: string;
};

export const INITIAL_ORIGINAL_TEXT: OriginalText = {
  text: '',
  chinese: '',
};

const COLLECTION = 'originalTexts';
const DOC_ID = 'AqDDMyH5B4xCIzPLAKVk';

const useOriginalTexts = () => {
  const [originalText, setOriginalText] = useState(INITIAL_ORIGINAL_TEXT);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, COLLECTION, DOC_ID),
      (doc) => {
        console.log('snapshot original sentence');
        let originalText = INITIAL_ORIGINAL_TEXT;
        if (doc.exists()) {
          originalText = {
            text: doc.data().text,
            chinese: doc.data().chinese,
          };
        }
        setOriginalText(originalText);
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const updateOriginalText = async (value: OriginalText) => {
    await updateDoc(doc(db, COLLECTION, DOC_ID), value);
  };

  return { originalText, updateOriginalText };
};
export default useOriginalTexts;
