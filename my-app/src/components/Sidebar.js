import React from 'react';
import ChatList from './ChatList.js';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <header className="sidebar-header">
        <h2>Chats</h2>
      </header>
      <ChatList />
    </div>
  );
};

export default Sidebar;
