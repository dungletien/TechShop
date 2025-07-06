import React from 'react';
import { Layout, Button, Input, Avatar, Dropdown, Space, Badge, Menu } from 'antd';
import { 
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  MenuOutlined
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const AdminHeader = ({ collapsed, onToggleCollapse }) => {
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Hồ sơ</Menu.Item>
      <Menu.Item key="settings">Cài đặt</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className="bg-white px-6 flex items-center justify-between border-b border-gray-200">
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={onToggleCollapse}
        className="text-lg"
      />
      
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          className="w-64"
        />
        
        <Badge count={5} size="small">
          <Button type="text" icon={<BellOutlined />} size="large" />
        </Badge>
        
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Space className="cursor-pointer">
            <Avatar icon={<UserOutlined />} />
            <span className="hidden md:inline">Admin</span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default AdminHeader; 