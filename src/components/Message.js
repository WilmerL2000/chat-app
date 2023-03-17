import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext, ChatContext } from '../context';
import { formatDate } from '../utils/fomatDate';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    /* Scrolling the message into view. */
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : data?.user?.photoURL
          }
          alt=""
        />
        <span>{formatDate(message.date.seconds) + ' '}ago</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
