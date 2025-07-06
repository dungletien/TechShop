import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { Input, Button, Form, message, Divider, Empty } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      message.success('Đặt hàng thành công!');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Thanh toán đơn hàng</h1>
        {cart.length === 0 ? (
          <Empty description="Giỏ hàng trống">
            <Link to="/products" className="mt-4 inline-block text-blue-600 hover:underline">Tiếp tục mua sắm</Link>
          </Empty>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Sản phẩm trong giỏ</h2>
            <ul className="divide-y divide-gray-200 mb-6">
              {cart.map(item => (
                <li key={item.id} className="flex items-center py-3 gap-4">
                  <img src={item.image || '/favicon.ico'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-gray-500 text-sm">Số lượng: {item.quantity}</div>
                  </div>
                  <div className="font-semibold text-blue-600">{item.price}</div>
                </li>
              ))}
            </ul>
            <Divider />
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-lg">Tổng cộng:</span>
              <span className="text-2xl font-bold text-green-600">{totalPrice.toLocaleString()}₫</span>
            </div>
            <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
            <Form layout="vertical" form={form} onFinish={handleFinish}>
              <Form.Item name="name" label="Họ và tên"> <Input placeholder="Nhập họ và tên" /> </Form.Item>
              <Form.Item name="phone" label="Số điện thoại"> <Input placeholder="Nhập số điện thoại" /> </Form.Item>
              <Form.Item name="address" label="Địa chỉ nhận hàng"> <Input placeholder="Nhập địa chỉ" /> </Form.Item>
              <Form.Item name="email" label="Email"> <Input placeholder="Nhập email (không bắt buộc)" /> </Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={loading} className="mt-2">Xác nhận đặt hàng</Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout; 