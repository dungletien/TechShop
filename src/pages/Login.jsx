import React, { useState } from "react";
import { Form, Input, Button, message, Alert, Table } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { accounts } from "../constants/accounts";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setErrorMsg("");

    const found = accounts.find(
      (acc) => acc.email === values.email && acc.password === values.password
    );

    setTimeout(() => {
      setLoading(false);

      if (found) {
        message.success(`Đăng nhập thành công! Xin chào ${found.name}`);
        localStorage.setItem("currentUser", JSON.stringify(found));
        if (found.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setErrorMsg("Email hoặc mật khẩu không đúng. Vui lòng thử lại!");
        message.error("Email hoặc mật khẩu không đúng!");
      }
    }, 800);
  };

  // 👉 Chuẩn bị dữ liệu bảng
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (text) =>
        text === "admin" ? (
          <span className="text-red-500 font-semibold">Admin</span>
        ) : (
          <span className="text-green-600 font-semibold">User</span>
        ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-pink-100 py-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3 shadow-lg">
            <UserOutlined className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">
            Đăng nhập
          </h2>
        </div>

        {errorMsg && (
          <Alert
            message={errorMsg}
            type="error"
            showIcon
            className="mb-4 w-full"
          />
        )}

        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="w-full mt-2"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập email"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold shadow"
          >
            Đăng nhập
          </Button>
        </Form>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>

      {/* 👉 Hiển thị tài khoản mẫu */}
      <div className="bg-white/90 rounded-3xl shadow-xl p-6 mt-8 w-full max-w-3xl">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
          📌 Tài khoản mẫu để đăng nhập nhanh
        </h3>
        <Table
          columns={columns}
          dataSource={accounts.map((acc, idx) => ({ ...acc, key: idx }))}
          pagination={false}
          bordered
          className="rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};

export default Login;
