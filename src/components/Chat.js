import React from 'react';
import { Messages, Input } from './';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Clara</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
