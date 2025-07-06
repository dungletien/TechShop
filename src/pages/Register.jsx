import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Đăng ký thành công!');
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-pink-100 py-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3 shadow-lg">
            <UserOutlined className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">Đăng ký tài khoản</h2>
        </div>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off" className="w-full mt-2">
          <Form.Item name="name" label="Họ và tên">
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input prefix={<MailOutlined />} placeholder="Nhập email" size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="confirm" label="Xác nhận mật khẩu">
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" size="large" className="rounded-lg" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading} className="mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold shadow">
            Đăng ký
          </Button>
        </Form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 