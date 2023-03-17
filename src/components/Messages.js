import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { ChatContext } from '../context';
import { db } from '../firebase';
import { Message } from './';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    /* Subscribing to the document in the database and setting the state of the messages to the
    messages in the database. */
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.length === 0 ? (
        <span style={{ fontSize: '20px' }}>No messages...</span>
      ) : (
        messages.map((message) => (
          <Message message={message} key={message.id} />
        ))
      )}
    </div>
  );
};

export default Messages;
