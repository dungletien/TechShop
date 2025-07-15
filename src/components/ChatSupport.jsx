import React, { useState } from 'react';
import { Drawer, Input, Button } from 'antd';
import { MessageOutlined, SendOutlined } from '@ant-design/icons';

const ChatSupport = () => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={handleOpen}
        className="!rounded-button fixed bottom-8 right-24 w-12 h-12 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors z-50 cursor-pointer whitespace-nowrap"
      >
        <MessageOutlined />
      </button>

      {/* Drawer */}
      <Drawer
        title="Hỗ Trợ Trực Tuyến"
        placement="right"
        onClose={handleClose}
        open={visible}
        width={400}
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-auto p-4 bg-gray-100 rounded-lg mb-4">
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <i className="fas fa-headset text-blue-600"></i>
              </div>
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
                <p className="text-gray-800">
                  Xin chào! Tôi có thể giúp gì cho bạn?
                </p>
                <span className="text-xs text-gray-500">
                  10:30 AM
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <Input
              placeholder="Nhập tin nhắn của bạn..."
              className="mr-2 rounded-full"
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              className="!rounded-button rounded-full w-12 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 border-none whitespace-nowrap cursor-pointer"
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ChatSupport;