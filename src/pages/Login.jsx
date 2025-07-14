import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/#');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-pink-100 py-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3 shadow-lg">
            <UserOutlined className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">Đăng nhập</h2>
        </div>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off" className="w-full mt-2">
          <Form.Item name="email" label="Email">
            <Input prefix={<UserOutlined />} placeholder="Nhập email" size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" size="large" className="rounded-lg" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading} className="mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold shadow">
            Đăng nhập
          </Button>
        </Form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 