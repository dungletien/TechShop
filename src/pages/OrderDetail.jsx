// src/pages/OrderDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { orders } from "../constants/orders";
import { Card, Button, Tag, Modal } from "antd";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (!stored) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(stored);
    const found = orders.find(
      (o) => o.id.toString() === id && o.userEmail === user.email
    );
    setOrder(found || null);
  }, [id, navigate]);

  // ✅ Tính tổng tiền
  const calcTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });
    return total.toLocaleString("vi-VN") + "₫";
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
        <p className="text-gray-600">
          Không tìm thấy đơn hàng hoặc bạn chưa đăng nhập.
        </p>
        <Button onClick={() => navigate("/my-orders")} className="mt-4">
          Quay lại danh sách đơn hàng
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Chi tiết đơn hàng #{order.id}
        </h1>
        <Tag
          color={
            order.status === "Đã giao"
              ? "green"
              : order.status === "Đang giao hàng"
              ? "blue"
              : "orange"
          }
          className="text-base px-3 py-1"
        >
          {order.status}
        </Tag>
      </div>

      {/* Thông tin đơn hàng */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">📅 Thông tin đơn hàng</h2>
          <p className="text-gray-600">Ngày đặt: {order.date}</p>
          <p className="text-gray-600">Mã đơn hàng: #{order.id}</p>
          <p className="text-gray-600">Khách hàng: {order.userName}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">
            🚚 Giao hàng & Thanh toán
          </h2>
          <p className="text-gray-600">
            Địa chỉ: <span className="font-medium">{order.address}</span>
          </p>
          <p className="text-gray-600">
            Thanh toán:{" "}
            <span className="font-medium">{order.paymentMethod}</span>
          </p>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <h2 className="text-xl font-semibold mb-4">🛒 Sản phẩm trong đơn</h2>
      <div className="space-y-4">
        {order.items.map((item, idx) => (
          <Card
            key={idx}
            className="shadow-md rounded-xl cursor-pointer hover:shadow-lg transition"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Số lượng: {item.quantity}
                </p>
              </div>
              <div className="font-semibold text-blue-600 text-lg">
                {item.price.toLocaleString("vi-VN")}₫
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tổng tiền */}
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">
          Tổng tiền:{" "}
          <span className="text-blue-700">{calcTotal(order.items)}</span>
        </p>
      </div>

      <div className="mt-6">
        <Button onClick={() => navigate("/my-orders")}>
          ⬅ Quay lại danh sách đơn hàng
        </Button>
      </div>

      {/* Modal chi tiết sản phẩm */}
      <Modal
        title="Chi tiết sản phẩm"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowModal(false)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedItem && (
          <div className="flex flex-col items-center">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-40 h-40 object-cover rounded-xl mb-4 shadow"
            />
            <h3 className="text-lg font-bold mb-2">{selectedItem.name}</h3>
            <p className="text-gray-500 mb-1">
              Số lượng: {selectedItem.quantity}
            </p>
            <p className="text-blue-600 font-semibold text-lg">
              {selectedItem.price.toLocaleString("vi-VN")}₫
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
