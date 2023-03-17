import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext, ChatContext } from '../context';
import { db } from '../firebase';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch, setIsInChat } = useContext(ChatContext);

  useEffect(() => {
    /**
     * Get the chats for the current user and set the state of the chats to the data from the database.
     * @returns A function that unsubscribes from the listener.
     */
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <div className="chats">
      {chats
        ? Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="userChat"
                key={chat[0]}
                onClick={(e) => {
                  handleSelect(chat[1].userInfo);
                  setIsInChat(true);
                }}
              >
                <img src={chat[1]?.userInfo?.photoURL} alt="UserPicture" />
                <div className="userChatInfo">
                  <span>{chat[1]?.userInfo?.displayName}</span>
                  <p>{chat[1]?.lastMessage?.text}</p>
                </div>
              </div>
            ))
        : ''}
    </div>
  );
};

export default Chats;
