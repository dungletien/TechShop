import React, { useEffect, useState } from "react";
import { Card, Table, Tabs } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { orders as initialOrders } from "../data/orders";
import { products as initialProducts } from "../data/products";

const { TabPane } = Tabs;

export default function ReportsPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [productStats, setProductStats] = useState([]);

  // Lấy dữ liệu từ localStorage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const savedProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      setOrders(savedOrders.length > 0 ? savedOrders : initialOrders);
      setProducts(savedProducts.length > 0 ? savedProducts : initialProducts);
    } catch (err) {
      console.error("Lỗi đọc localStorage:", err);
      setOrders(initialOrders);
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      calcMonthlyStats();
      calcProductStats();
    }
  }, [orders, products]);

  // Thống kê theo tháng
  const calcMonthlyStats = () => {
    const map = {};
    orders.forEach((order) => {
      if (!order.createdAt) return;
      const date = new Date(order.createdAt);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      map[key] = (map[key] || 0) + Number(order.total || 0);
    });
    setMonthlyStats(
      Object.entries(map).map(([month, revenue]) => ({ month, revenue }))
    );
  };

  // Thống kê theo sản phẩm
  const calcProductStats = () => {
    const productMap = {};
    orders.forEach((order) => {
      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          const key = item.productName;
          if (!productMap[key]) {
            productMap[key] = { quantity: 0, revenue: 0 };
          }
          productMap[key].quantity += item.quantity;
          productMap[key].revenue += item.quantity * item.price;
        });
      }
    });
    setProductStats(
      Object.entries(productMap).map(([name, data]) => ({
        name,
        quantity: data.quantity,
        revenue: data.revenue,
      }))
    );
  };

  const monthlyColumns = [
    { title: "Tháng/Năm", dataIndex: "month", key: "month" },
    {
      title: "Tổng doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (val) => val.toLocaleString("vi-VN") + "₫",
    },
  ];

  const productColumns = [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Số lượng bán", dataIndex: "quantity", key: "quantity" },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (val) => val.toLocaleString("vi-VN") + "₫",
    },
  ];

  return (
    <Card
      title="📊 Báo cáo thống kê"
      style={{ borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
    >
      <Tabs defaultActiveKey="1">
        {/* Doanh thu theo tháng */}
        <TabPane tab="Doanh thu theo tháng/năm" key="1">
          <div style={{ width: "100%", height: 300, marginBottom: 24 }}>
            <ResponsiveContainer>
              <BarChart
                data={monthlyStats}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => v / 1000000 + "M"} />
                <Tooltip
                  formatter={(value) => value.toLocaleString("vi-VN") + "₫"}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#4ade80"
                  barSize={40}
                  radius={[8, 8, 0, 0]}
                  name="Doanh thu"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Table
            dataSource={monthlyStats}
            columns={monthlyColumns}
            rowKey="month"
            pagination={false}
          />
        </TabPane>

        {/* Doanh thu theo sản phẩm */}
        <TabPane tab="Doanh thu theo sản phẩm" key="2">
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {/* Biểu đồ doanh thu */}
            <div style={{ flex: 1, minWidth: 400, height: 300 }}>
              <h3 style={{ marginBottom: 8 }}>💰 Doanh thu theo sản phẩm</h3>
              <ResponsiveContainer>
                <BarChart
                  data={productStats}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis tickFormatter={(v) => v / 1000000 + "M"} />
                  <Tooltip
                    formatter={(value) => value.toLocaleString("vi-VN") + "₫"}
                  />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#60a5fa"
                    barSize={30}
                    radius={[8, 8, 0, 0]}
                    name="Doanh thu"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Biểu đồ số lượng */}
            <div style={{ flex: 1, minWidth: 400, height: 300 }}>
              <h3 style={{ marginBottom: 8 }}>📦 Số lượng bán theo sản phẩm</h3>
              <ResponsiveContainer>
                <BarChart
                  data={productStats}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="quantity"
                    fill="#f472b6"
                    barSize={30}
                    radius={[8, 8, 0, 0]}
                    name="Số lượng bán"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <Table
            dataSource={productStats}
            columns={productColumns}
            rowKey="name"
            pagination={false}
            style={{ marginTop: 24 }}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
}
