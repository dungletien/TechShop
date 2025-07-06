import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  ShoppingOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  SettingOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { menuItems } from '../data/products';

const { Sider } = Layout;

const Sidebar = ({ collapsed, selectedKey, onMenuClick }) => {
  const getIcon = (iconName) => {
    const icons = {
      DashboardOutlined: <DashboardOutlined />,
      ShoppingOutlined: <ShoppingOutlined />,
      UserOutlined: <UserOutlined />,
      FileTextOutlined: <FileTextOutlined />,
      SettingOutlined: <SettingOutlined />,
      ShoppingCartOutlined: <ShoppingCartOutlined />
    };
    return icons[iconName] || null;
  };

  const menuItemsWithIcons = menuItems.map(item => ({
    ...item,
    icon: getIcon(item.icon)
  }));

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      className="bg-white border-r border-gray-200"
    >
      <div className="p-4 border-b border-gray-200">
        <h1 className={`text-xl font-bold text-blue-600 ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? 'AD' : 'Admin Panel'}
        </h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItemsWithIcons}
        onClick={onMenuClick}
        className="border-0"
      />
    </Sider>
  );
};

export default Sidebar; 