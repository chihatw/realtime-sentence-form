import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import config from './config';

const firebaseApp = initializeApp(config);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
