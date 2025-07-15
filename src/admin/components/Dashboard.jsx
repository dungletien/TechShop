import React, { useEffect, useState } from "react";
import { Card, Statistic, Row, Col, Table, Tag } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { products as initialProducts } from "../data/products";
import { orders as initialOrders } from "../data/orders";
import { customers as initialCustomers } from "../data/customers";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Load dữ liệu từ localStorage hoặc fallback
  useEffect(() => {
    // Products
    try {
      const savedProducts = localStorage.getItem("products");
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        } else {
          setProducts(initialProducts);
        }
      } else {
        setProducts(initialProducts);
      }
    } catch {
      setProducts(initialProducts);
    }

    // Orders
    try {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        } else {
          setOrders(initialOrders);
        }
      } else {
        setOrders(initialOrders);
      }
    } catch {
      setOrders(initialOrders);
    }

    // Customers
    try {
      const savedCustomers = localStorage.getItem("customers");
      if (savedCustomers) {
        const parsed = JSON.parse(savedCustomers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomers(parsed);
        } else {
          setCustomers(initialCustomers);
        }
      } else {
        setCustomers(initialCustomers);
      }
    } catch {
      setCustomers(initialCustomers);
    }
  }, []);

  // Tính tổng doanh thu từ orders
  const totalRevenue = orders
    .filter((o) => o.status === "Đã giao")
    .reduce((sum, o) => {
      // đảm bảo chuyển về số
      const val = parseFloat(o.total?.toString().replace(/[^\d.-]/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

  // Columns cho bảng sản phẩm gần đây
  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "Tên", dataIndex: "name" },
    { title: "Danh mục", dataIndex: "category" },
    {
      title: "Giá",
      dataIndex: "price",
      render: (val) =>
        typeof val === "number"
          ? val.toLocaleString("vi-VN") + "₫"
          : val?.toString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => (
        <Tag color={text === "active" ? "green" : "red"}>
          {text === "active" ? "Hoạt động" : "Ngừng"}
        </Tag>
      ),
    },
    { title: "Đã bán", dataIndex: "sales", width: 90 },
  ];

  return (
    <div>
      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              suffix="₫"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Đơn hàng"
              value={orders.length}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Sản phẩm"
              value={products.length}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Khách hàng"
              value={customers.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#eb2f96" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Products Table */}
      <Card
        title="📌 Sản phẩm gần đây"
        style={{ borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        <Table
          dataSource={products.slice(0, 5)}
          columns={columns}
          rowKey="id"
          bordered
          pagination={false}
        />
      </Card>
    </div>
  );
}
