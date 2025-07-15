import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
} from "antd";
import { customers as initialCustomers } from "../data/customers";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function CustomersManagement() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [form] = Form.useForm();

  // Load dữ liệu
  useEffect(() => {
    try {
      const saved = localStorage.getItem("customers");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomers(parsed);
          setFilteredCustomers(parsed);
          return;
        }
      }
      setCustomers(initialCustomers);
      setFilteredCustomers(initialCustomers);
    } catch (e) {
      console.error("Lỗi đọc customers từ localStorage:", e);
      setCustomers(initialCustomers);
      setFilteredCustomers(initialCustomers);
    }
  }, []);

  // Lưu về localStorage mỗi khi customers thay đổi
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
    handleFilter(searchValue); // lọc lại mỗi khi danh sách thay đổi
  }, [customers]);

  // Hàm lọc theo tên
  const handleFilter = (value) => {
    setSearchValue(value);
    const keyword = value.trim().toLowerCase();
    if (!keyword) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((c) =>
        c.name.toLowerCase().includes(keyword)
      );
      setFilteredCustomers(filtered);
    }
  };

  const openModal = (record = null, index = -1) => {
    if (record) {
      form.setFieldsValue(record);
      setEditIndex(index);
    } else {
      form.resetFields();
      form.setFieldsValue({
        createdAt: new Date().toISOString().split("T")[0],
      });
      setEditIndex(-1);
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editIndex >= 0) {
        const updated = [...customers];
        updated[editIndex] = { ...updated[editIndex], ...values };
        setCustomers(updated);
        message.success("✅ Cập nhật khách hàng thành công!");
      } else {
        const newCustomer = {
          ...values,
          id:
            customers.length > 0
              ? Math.max(...customers.map((c) => c.id || 0)) + 1
              : 1,
        };
        setCustomers([...customers, newCustomer]);
        message.success("✅ Thêm khách hàng thành công!");
      }
      setModalVisible(false);
      form.resetFields();
      setEditIndex(-1);
    });
  };

  const handleDelete = (index) => {
    const updated = [...customers];
    updated.splice(index, 1);
    setCustomers(updated);
    message.success("🗑️ Xóa khách hàng thành công!");
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "Tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Điện thoại", dataIndex: "phone" },
    { title: "Địa chỉ", dataIndex: "address" },
    { title: "Ngày tạo", dataIndex: "createdAt", width: 120 },
    {
      title: "Hành động",
      fixed: "right",
      width: 120,
      render: (_, record, index) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => openModal(record, index)}
          />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(index)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card
      title="👥 Quản lý khách hàng"
      style={{
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        margin: "16px",
      }}
    >
      {/* Thanh công cụ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          gap: 8,
        }}
      >
        <Input
          placeholder="🔎 Tìm theo tên khách hàng..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => handleFilter(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Thêm khách hàng
        </Button>
      </div>

      {/* Bảng khách hàng */}
      <Table
        dataSource={filteredCustomers}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />

      {/* Modal thêm/sửa */}
      <Modal
        open={modalVisible}
        title={
          editIndex >= 0 ? "✏️ Sửa thông tin khách hàng" : "➕ Thêm khách hàng"
        }
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="Lưu"
        cancelText="Hủy"
        centered
        style={{ top: 20 }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 8 }}
          initialValues={{ createdAt: new Date().toISOString().split("T")[0] }}
        >
          <Form.Item
            label="Tên khách hàng"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng" },
            ]}
          >
            <Input placeholder="Nhập tên khách hàng..." />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email..." />
          </Form.Item>

          <Form.Item
            label="Điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại..." />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Nhập địa chỉ..." />
          </Form.Item>

          <Form.Item label="Ngày tạo" name="createdAt">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
