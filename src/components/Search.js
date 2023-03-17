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
  const { username, onInputChange, onResetForm } = useForm({ username: '' });
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
    /* Creating a unique id for the chat. */
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      /* Getting the document from the chats collection with the id of combinedId. */
      const response = await getDoc(doc(db, 'chats', combinedId));

      if (!response.exists()) {
        /* Creating a document in the chats collection with the id of combinedId and setting the
        messages property to an empty array. */
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        //create user chats
        /* Updating the document in the userChats collection with the id of the current user. */
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        /* Updating the document in the userChats collection with the id of the user that is being
        searched for. */
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {}

    setUser(null);
    onResetForm();
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
