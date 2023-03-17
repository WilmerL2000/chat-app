import React, { useContext } from 'react';
import { ChatContext } from '../context';
import { Messages, Input } from './';
import More from '../img/more.png';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const Chat = () => {
  const { data, setIsInChat } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="chatUser">
          <button onClick={() => setIsInChat(false)}>
            <ChevronLeftIcon style={{ height: '24px', width: '22px' }} />
          </button>

          <img src={data?.user?.photoURL} alt="UserPicture" />
          <span>{data?.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <button>
            <img src={More} alt="" />
          </button>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
