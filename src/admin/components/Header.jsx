import React, { useState } from "react";
import {
  Layout,
  Button,
  Input,
  Avatar,
  Dropdown,
  Space,
  Badge,
  Menu,
  message,
} from "antd";
import {
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

const AdminHeader = ({ collapsed, onToggleCollapse, onSearch }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // mỗi khi gõ vào ô tìm kiếm sẽ gọi onSearch
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value.trim().toLowerCase());
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      // Xóa thông tin đăng nhập
      localStorage.removeItem("loggedInUser");
      // Điều hướng về trang đăng nhập Admin
      navigate("/admin/login");
    } else {
      message.info(`Bạn chọn: ${key}`);
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
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
          placeholder="Tìm kiếm theo tên..."
          prefix={<SearchOutlined />}
          className="w-64"
          value={searchValue}
          onChange={handleChange}
          allowClear
        />

        <Badge count={5} size="small">
          <Button type="text" icon={<BellOutlined />} size="large" />
        </Badge>

        <Dropdown overlay={userMenu} trigger={["click"]}>
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
