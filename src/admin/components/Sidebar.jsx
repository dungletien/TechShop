import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ collapsed, selectedKey, onMenuClick }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        minHeight: "100vh",
        background: "#001529",
        boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo / Tiêu đề */}
      <div
        style={{
          height: 64,
          margin: 16,
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: 8,
          color: "#fff",
          fontWeight: "bold",
          fontSize: collapsed ? 20 : 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          transition: "all 0.3s",
        }}
      >
        <ShopOutlined
          style={{ marginRight: collapsed ? 0 : 8, fontSize: 22 }}
        />
        {!collapsed && "TechShop"}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={(e) => onMenuClick(e.key)}
        style={{
          fontSize: 16,
        }}
        items={[
          {
            key: "dashboard",
            icon: <DashboardOutlined style={{ fontSize: 18 }} />,
            label: "Bảng điều khiển",
          },
          {
            key: "products",
            icon: <ShoppingOutlined style={{ fontSize: 18 }} />,
            label: "Sản phẩm",
          },
          {
            key: "orders",
            icon: <ShoppingCartOutlined style={{ fontSize: 18 }} />,
            label: "Đơn hàng",
          },
          {
            key: "customers",
            icon: <UserOutlined style={{ fontSize: 18 }} />,
            label: "Khách hàng",
          },
          {
            key: "reports",
            icon: <FileTextOutlined style={{ fontSize: 18 }} />,
            label: "Báo cáo",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
