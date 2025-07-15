import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
  Tag,
} from "antd";
import { orders as initialOrders } from "../data/orders";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [form] = Form.useForm();

  // Load dữ liệu
  useEffect(() => {
    try {
      const saved = localStorage.getItem("orders");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          setFilteredOrders(parsed);
          return;
        }
      }
      setOrders(initialOrders);
      setFilteredOrders(initialOrders);
    } catch (e) {
      console.error("Lỗi đọc orders từ localStorage:", e);
      setOrders(initialOrders);
      setFilteredOrders(initialOrders);
    }
  }, []);

  // Lưu về localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    handleFilter(searchValue); // lọc lại khi danh sách thay đổi
  }, [orders]);

  // Lọc theo tên khách hàng
  const handleFilter = (value) => {
    setSearchValue(value);
    const keyword = value.trim().toLowerCase();
    if (!keyword) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((o) =>
        o.customerName.toLowerCase().includes(keyword)
      );
      setFilteredOrders(filtered);
    }
  };

  // Mở modal
  const openModal = (record = null) => {
    if (record) {
      form.setFieldsValue(record);
      setEditIndex(orders.findIndex((o) => o.id === record.id));
    } else {
      form.resetFields();
      form.setFieldsValue({
        status: "Đang xử lý",
        createdAt: new Date().toISOString().split("T")[0],
      });
      setEditIndex(-1);
    }
    setModalVisible(true);
  };

  // Lưu thêm/sửa
  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editIndex >= 0) {
        const updated = [...orders];
        updated[editIndex] = { ...updated[editIndex], ...values };
        setOrders(updated);
        message.success("✅ Cập nhật đơn hàng thành công!");
      } else {
        const newOrder = {
          ...values,
          id:
            orders.length > 0
              ? Math.max(...orders.map((o) => o.id || 0)) + 1
              : 1,
        };
        setOrders([...orders, newOrder]);
        message.success("✅ Thêm đơn hàng thành công!");
      }
      setModalVisible(false);
      form.resetFields();
      setEditIndex(-1);
    });
  };

  // Xoá theo id
  const handleDelete = (id) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    message.success("🗑️ Xóa đơn hàng thành công!");
  };

  // Cột bảng
  const columns = [
    { title: "Mã đơn", dataIndex: "id", width: 80 },
    { title: "Khách hàng", dataIndex: "customerName" },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      render: (value) => {
        const num = Number(value);
        return isNaN(num) ? value : num.toLocaleString("vi-VN") + "₫";
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => (
        <Tag
          color={
            text === "Đã giao" ? "green" : text === "Đã hủy" ? "red" : "orange"
          }
        >
          {text}
        </Tag>
      ),
    },
    { title: "Ngày tạo", dataIndex: "createdAt", width: 120 },
    {
      title: "Hành động",
      width: 150,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card
      title="📦 Quản lý đơn hàng"
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
          Thêm đơn hàng
        </Button>
      </div>

      <Table
        dataSource={filteredOrders}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />

      {/* Modal thêm/sửa */}
      <Modal
        open={modalVisible}
        title={editIndex >= 0 ? "✏️ Sửa đơn hàng" : "➕ Thêm đơn hàng"}
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
          initialValues={{
            status: "Đang xử lý",
            createdAt: new Date().toISOString().split("T")[0],
          }}
        >
          <Form.Item
            label="Tên khách hàng"
            name="customerName"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng" },
            ]}
          >
            <Input placeholder="Nhập tên khách hàng..." />
          </Form.Item>

          <Form.Item
            label="Tổng tiền"
            name="total"
            rules={[{ required: true, message: "Vui lòng nhập tổng tiền" }]}
          >
            <Input type="number" placeholder="Nhập tổng tiền..." />
          </Form.Item>

          <Form.Item label="Trạng thái" name="status">
            <Select>
              <Option value="Đang xử lý">Đang xử lý</Option>
              <Option value="Đã giao">Đã giao</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ngày tạo" name="createdAt">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
