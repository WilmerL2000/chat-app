import React, { useContext } from 'react';
import { Chat, Sidebar } from '../components';
import { ChatContext } from '../context';

const Home = () => {
  const { isInChat } = useContext(ChatContext);

  return (
    <div className="home">
      <div className="container">
        <div style={{ display: isInChat ? 'none' : 'flex', width: '100%' }}>
          <Sidebar />
        </div>
        <div style={{ display: !isInChat && 'none', width: '100%' }}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
