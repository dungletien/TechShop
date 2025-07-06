import React from 'react';
import { Button, Input, Form } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const Footer = ({ categories = [] }) => {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-6">TechShop</h3>
            <p className="text-gray-400 mb-4">
              Cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất thị trường.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Thông Tin</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Về chúng tôi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Chính sách đổi trả</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Hướng dẫn mua hàng</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Danh Mục</h4>
            <ul className="space-y-3">
              {Array.isArray(categories) && categories.map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">{category.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Liên Hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <EnvironmentOutlined className="text-blue-400 mt-1 mr-3" />
                <span className="text-gray-400">123 Lê Trọng Tấn, Hà Nội</span>
              </li>
              <li className="flex items-center">
                <PhoneOutlined className="text-blue-400 mr-3" />
                <span className="text-gray-400">+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <MailOutlined className="text-blue-400 mr-3" />
                <span className="text-gray-400">info@techshop.vn</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-medium mb-3">Đăng ký nhận tin</h5>
              <Form layout="inline" className="flex">
                <Form.Item className="flex-grow mb-0">
                  <Input
                    placeholder="Email của bạn"
                    className="w-full rounded-l-lg border border-gray-600 border-r-0 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  className="!rounded-l-none rounded-r-lg bg-blue-600 hover:bg-blue-700 border border-gray-600 text-white whitespace-nowrap cursor-pointer"
                >
                  Đăng ký
                </Button>
              </Form>
            </div>



          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p className="text-sm">&copy; {new Date().getFullYear()} TechShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;