import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import AdminHeader from './components/Header';
import Dashboard from './components/Dashboard';
import ProductsManagement from './components/ProductsManagement';
import { 
  OrdersManagement, 
  CustomersManagement, 
  ReportsPage, 
  SettingsPage 
} from './components/OtherPages';
import { products } from './data/products';

const { Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard products={products} />;
      case 'products':
        return <ProductsManagement products={products} />;
      case 'orders':
        return <OrdersManagement />;
      case 'customers':
        return <CustomersManagement />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard products={products} />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar 
        collapsed={collapsed}
        selectedKey={selectedKey}
        onMenuClick={handleMenuClick}
      />
      
      <Layout>
        <AdminHeader 
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
        />
        
        <Content className="m-6">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin; 