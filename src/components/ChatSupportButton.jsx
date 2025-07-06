import React from 'react';
import { MessageOutlined } from '@ant-design/icons';

const ChatSupportButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="!rounded-button fixed bottom-8 right-24 w-12 h-12 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors z-50 cursor-pointer whitespace-nowrap"
  >
    <MessageOutlined />
  </button>
);

export default ChatSupportButton; 