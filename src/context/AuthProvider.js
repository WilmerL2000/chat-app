import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from './';

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState({});

  useEffect(() => {
    /* A function that is called when the user is logged in or logged out. */
    const unsub = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
