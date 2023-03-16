import React from 'react';
import { Navbar, Seacrh, Chats } from './';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Seacrh />
      <Chats />
    </div>
  );
};

export default Sidebar;
