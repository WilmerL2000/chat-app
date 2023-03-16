import React, { useContext, useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';

const Search = () => {
  const { username, onInputChange } = useForm({ username: '' });
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!username) setUser(null);
  }, [username]);

  const handleSearch = async () => {
    /* Creating a query to search for a user with the displayName of the username that is being
    searched for. */
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );
    try {
      /* Getting the documents from the query. */
      const querySnapshot = await getDocs(q);
      /* Looping through the querySnapshot and setting the user to the data of the document. */
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    //create user chats
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          value={username}
          name="username"
          onChange={onInputChange}
          onKeyUp={handleSearch}
          placeholder="Find a user!"
        />
      </div>
      {err && <span>User not found!</span>}
      {username
        ? user && (
            <div className="userChat" onClick={handleSelect}>
              <img src={user.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{user.displayName}</span>
              </div>
            </div>
          )
        : ''}
    </div>
  );
};

export default Search;
