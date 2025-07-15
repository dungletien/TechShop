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
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { products as initialProducts } from "../data/products";

const { Option } = Select;

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [form] = Form.useForm();

  // Lấy dữ liệu từ localStorage hoặc fallback sang file data
  useEffect(() => {
    try {
      const saved = localStorage.getItem("products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          setFilteredProducts(parsed);
          return;
        }
      }
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    } catch (err) {
      console.error("Lỗi đọc products từ localStorage:", err);
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    }
  }, []);

  // Lưu vào localStorage khi products thay đổi
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    handleFilter(searchValue);
  }, [products]);

  // Lọc theo tên sản phẩm
  const handleFilter = (value) => {
    setSearchValue(value);
    const keyword = value.trim().toLowerCase();
    if (!keyword) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(keyword)
      );
      setFilteredProducts(filtered);
    }
  };

  // Mở modal
  const openModal = (record = null) => {
    if (record) {
      form.setFieldsValue(record);
      const idx = products.findIndex((p) => p.id === record.id);
      setEditIndex(idx);
    } else {
      form.resetFields();
      form.setFieldsValue({
        status: "active",
        sales: 0,
      });
      setEditIndex(-1);
    }
    setModalVisible(true);
  };

  // Lưu dữ liệu khi thêm/sửa
  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editIndex >= 0) {
        // cập nhật
        const updated = [...products];
        updated[editIndex] = { ...updated[editIndex], ...values };
        setProducts(updated);
        message.success("✅ Cập nhật sản phẩm thành công!");
      } else {
        // thêm mới
        const newProduct = {
          ...values,
          id:
            products.length > 0
              ? Math.max(...products.map((p) => p.id || 0)) + 1
              : 1,
        };
        setProducts([...products, newProduct]);
        message.success("✅ Thêm sản phẩm thành công!");
      }
      setModalVisible(false);
      form.resetFields();
      setEditIndex(-1);
    });
  };

  // Xóa sản phẩm theo id
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    message.success("🗑️ Xóa sản phẩm thành công!");
  };

  // Cột bảng
  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "Tên", dataIndex: "name" },
    { title: "Danh mục", dataIndex: "category" },
    {
      title: "Giá",
      dataIndex: "price",
      render: (val) =>
        val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫",
    },
    { title: "Kho", dataIndex: "stock" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => (
        <Tag color={text === "active" ? "green" : "red"}>
          {text === "active" ? "Hoạt động" : "Ngừng"}
        </Tag>
      ),
    },
    { title: "Đã bán", dataIndex: "sales" },
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
      title="📦 Quản lý sản phẩm"
      style={{
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        margin: 16,
      }}
    >
      {/* Thanh tìm kiếm và thêm */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          gap: 8,
        }}
      >
        <Input
          placeholder="🔎 Tìm theo tên sản phẩm..."
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
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />

      <Modal
        open={modalVisible}
        title={editIndex >= 0 ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm"}
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
          initialValues={{ status: "active", sales: 0 }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập tên sản phẩm..." />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input type="number" placeholder="Nhập giá..." />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng nhập danh mục" }]}
          >
            <Input placeholder="Nhập danh mục..." />
          </Form.Item>

          <Form.Item
            label="Số lượng tồn kho"
            name="stock"
            rules={[{ required: true, message: "Vui lòng nhập số lượng tồn" }]}
          >
            <Input type="number" placeholder="Nhập số lượng tồn..." />
          </Form.Item>

          <Form.Item label="Trạng thái" name="status">
            <Select>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Ngừng</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Đã bán" name="sales">
            <Input type="number" placeholder="Nhập số lượng đã bán..." />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
