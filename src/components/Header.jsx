import React, { useState } from "react";
import { Input, Dropdown, Menu } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import { useCart } from "./CartContext";

const Header = ({ searchValue, setSearchValue }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // 👉 Bổ sung điều hướng cho orders và account
  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      navigate("/login");
    } else if (key === "orders") {
      navigate("/orders");
    } else if (key === "account") {
      navigate("/account");
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="orders" icon={<ProfileOutlined />}>
        Đơn hàng của tôi
      </Menu.Item>
      <Menu.Item key="account" icon={<SettingOutlined />}>
        Cài đặt tài khoản
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mr-4 sm:mr-8"
          >
            TechShop
          </Link>
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              Trang chủ
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              Sản phẩm
            </Link>
            <Link
              to="/promotion"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              Khuyến mãi
            </Link>
            <Link
              to="/news"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              Tin tức
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              Liên hệ
            </Link>
          </div>
          {/* Hamburger menu icon on mobile */}
          <button
            className="md:hidden ml-2 p-2 rounded hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Mở menu"
          >
            <MenuOutlined className="text-2xl text-gray-700" />
          </button>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search */}
          <div className="hidden sm:block relative w-40 md:w-64">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full border-gray-300"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCartOutlined className="text-2xl text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <Dropdown
            overlay={userMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="cursor-pointer flex items-center gap-1">
              <UserOutlined className="text-2xl text-gray-700" />
            </div>
          </Dropdown>
        </div>
      </div>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end md:hidden">
          <div className="w-3/4 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col">
            <button
              className="self-end mb-6 p-2 rounded hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Đóng menu"
            >
              <CloseOutlined className="text-2xl text-gray-700" />
            </button>
            <nav className="flex flex-col space-y-4 text-lg">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link
                to="/promotion"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Khuyến mãi
              </Link>
              <Link
                to="/news"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tin tức
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>
            </nav>
            <div className="mt-8 border-t pt-6 flex flex-col gap-4">
              <div className="relative">
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="rounded-full border-gray-300"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div className="flex gap-6 mt-2">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingCartOutlined className="text-2xl text-gray-700" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <Dropdown
                  overlay={userMenu}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <div className="cursor-pointer flex items-center gap-1">
                    <UserOutlined className="text-2xl text-gray-700" />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
