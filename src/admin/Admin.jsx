import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import AdminHeader from "./components/Header";
import Dashboard from "./components/Dashboard";
import ProductsManagement from "./components/ProductsManagement";
import OrdersManagement from "./components/OrdersManagement";
import CustomersManagement from "./components/CustomersManagement";
import ReportsPage from "./components/ReportsPage";
import { products as initialProducts } from "./data/products";

const { Content } = Layout;

export default function AdminApp() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [products] = useState(initialProducts);

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return <Dashboard products={products} />;
      case "products":
        return <ProductsManagement />;
      case "orders":
        return <OrdersManagement />;
      case "customers":
        return <CustomersManagement />;
      case "reports":
        return <ReportsPage />;
      default:
        return <Dashboard products={products} />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        selectedKey={selectedKey}
        onMenuClick={(key) => setSelectedKey(key)}
      />
      <Layout>
        <AdminHeader
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
        <Content style={{ margin: "16px" }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
}
