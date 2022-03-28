import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../repositories/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [initializing, setInitializing] = useState(!auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);
  return { user, initializing };
};
