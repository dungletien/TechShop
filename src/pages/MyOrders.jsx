import React, { useEffect, useState } from "react";
import { orders } from "../constants/orders";
import { Tag, Card, Empty, Button, Modal, Divider } from "antd";

export default function MyOrders() {
  const [userOrders, setUserOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      const u = JSON.parse(stored);
      setCurrentUser(u);

      // 🔎 Lọc đơn hàng theo email
      const filtered = orders.filter((o) => o.userEmail === u.email);
      setUserOrders(filtered);
    }
  }, []);

  // 🧮 Tính tổng tiền
  const calcTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      // nếu dữ liệu giá lưu là số
      const price =
        typeof item.price === "number"
          ? item.price
          : parseInt(item.price.replace(/[^\d]/g, ""));
      total += price * (item.quantity || 1);
    });
    return total.toLocaleString("vi-VN") + "₫";
  };

  // 📌 Xử lý xem chi tiết
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>
        <p className="text-gray-600">
          Bạn chưa đăng nhập. Vui lòng đăng nhập trước.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>
      {userOrders.length === 0 ? (
        <Empty description="Bạn chưa có đơn hàng nào." />
      ) : (
        <div className="grid gap-6">
          {userOrders.map((order) => (
            <Card
              key={order.id}
              title={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold">
                    Mã đơn hàng: #{order.id}
                  </span>
                  <Tag
                    color={
                      order.status === "Đã giao"
                        ? "green"
                        : order.status === "Đang giao hàng"
                        ? "blue"
                        : "orange"
                    }
                  >
                    {order.status}
                  </Tag>
                </div>
              }
              className="shadow-md rounded-xl"
              extra={
                <Button type="link" onClick={() => handleViewDetails(order)}>
                  Xem chi tiết
                </Button>
              }
            >
              <p className="text-sm text-gray-500 mb-3">
                Ngày đặt: {order.date}
              </p>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-t pt-3 first:border-none first:pt-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="font-semibold text-blue-600">
                      {typeof item.price === "number"
                        ? item.price.toLocaleString("vi-VN") + "₫"
                        : item.price}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end border-t pt-3">
                <span className="font-semibold text-lg text-gray-800">
                  Tổng tiền: {calcTotal(order.items)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 📦 Modal chi tiết đơn hàng */}
      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?.id}`}
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedOrder(null)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div className="space-y-3">
            <p>
              <strong>Khách hàng:</strong> {selectedOrder.userName}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.userEmail}
            </p>
            <p>
              <strong>Địa chỉ giao hàng:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {selectedOrder.paymentMethod}
            </p>
            <Divider />
            <h3 className="font-semibold mb-2">Sản phẩm:</h3>
            {selectedOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-t pt-3 first:border-none first:pt-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Số lượng: {item.quantity}
                  </p>
                </div>
                <div className="font-semibold text-blue-600">
                  {typeof item.price === "number"
                    ? item.price.toLocaleString("vi-VN") + "₫"
                    : item.price}
                </div>
              </div>
            ))}
            <Divider />
            <p className="text-right font-semibold text-lg">
              Tổng tiền: {calcTotal(selectedOrder.items)}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
