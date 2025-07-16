import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Avatar, Card, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function AccountSettings() {
  const [user, setUser] = useState(null);

  // 🔹 Lấy user từ localStorage khi mở trang
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const onFinish = (values) => {
    if (!user) return;

    // 🔹 Cập nhật thông tin user
    const updatedUser = {
      ...user,
      name: values.name,
      password: values.password,
    };

    // 🔹 Lưu lại vào localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    message.success("✅ Cập nhật thông tin thành công!");
  };

  // Nếu chưa có user (chưa đăng nhập)
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">
          Cài đặt tài khoản
        </h1>
        <p className="text-gray-600">
          ❌ Bạn chưa đăng nhập. Vui lòng đăng nhập trước.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 flex justify-center">
      <Card
        className="shadow-xl w-full max-w-xl"
        bordered={false}
        style={{ borderRadius: "16px" }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <Avatar
            size={96}
            style={{ backgroundColor: "#1677ff" }}
            icon={<UserOutlined />}
            className="mb-3"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            Xin chào, {user.name} 👋
          </h2>
          <p className="text-gray-500">
            Quản lý thông tin tài khoản của bạn tại đây
          </p>
        </div>

        <Divider />

        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            email: user.email,
            name: user.name,
            password: user.password,
          }}
          className="mt-4"
        >
          <Form.Item label="Email" name="email">
            <Input
              disabled
              className="rounded-lg"
              style={{ backgroundColor: "#f5f5f5" }}
            />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ tên" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold px-8"
            >
              💾 Lưu thay đổi
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
