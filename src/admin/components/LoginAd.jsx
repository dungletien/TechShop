import React, { useState } from "react";
import { Card, Form, Input, Button, message, Modal, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { users } from "../data/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function LoginAd() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleLogin = (values) => {
    setLoading(true);
    const { username, password } = values;

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      // Lưu và show modal chào mừng
      localStorage.setItem("loggedInUser", username);
      setCurrentUser(username);
      setWelcomeVisible(true);
      message.success("✅ Đăng nhập Admin thành công!");
    } else {
      message.error("❌ Sai tên đăng nhập hoặc mật khẩu!");
    }
    setLoading(false);
  };

  const handleOk = () => {
    setWelcomeVisible(false);
    navigate("/admin"); // ✅ chuyển về dashboard admin
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: 380,
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
        bordered={false}
        cover={
          <div
            style={{
              padding: "24px 16px 8px 16px",
              textAlign: "center",
              background: "white",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <Title level={3} style={{ margin: 0 }}>
              🔑 Đăng nhập Admin
            </Title>
            <Text type="secondary">Quản lý hệ thống TechShop</Text>
          </div>
        }
      >
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Nhập username..."
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder="Nhập password..."
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                borderRadius: 8,
                background: "linear-gradient(90deg,#f093fb 0%,#f5576c 100%)",
                border: "none",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Modal chào mừng */}
      <Modal
        open={welcomeVisible}
        title="🎉 Chào mừng!"
        onOk={handleOk}
        onCancel={handleOk}
        okText="Vào Dashboard"
        cancelButtonProps={{ style: { display: "none" } }}
        centered
      >
        <p>
          Xin chào <strong>{currentUser}</strong>, bạn đã đăng nhập thành công
          vào hệ thống quản trị.
        </p>
        <p>Bấm "Vào Dashboard" để tiếp tục quản lý.</p>
      </Modal>
    </div>
  );
}
