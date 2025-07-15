export const orders = [
  {
    id: 101,
    customerName: "Nguyễn Văn A",
    items: [
      { productName: "iPhone 15", quantity: 1, price: 25000000 },
      { productName: "Ốp lưng", quantity: 2, price: 150000 },
    ],
    total: 25300000,
    status: "Đã giao",
    createdAt: "2024-06-03",
  },
  {
    id: 102,
    customerName: "Trần Thị B",
    items: [{ productName: "MacBook Air M2", quantity: 1, price: 28000000 }],
    total: 28000000,
    status: "Đang xử lý",
    createdAt: "2024-08-08",
  },
  {
    id: 103,
    customerName: "Lê Văn C",
    items: [
      { productName: "Tai nghe AirPods Pro", quantity: 1, price: 5500000 },
      { productName: "Sạc nhanh 20W", quantity: 1, price: 550000 },
    ],
    total: 6050000,
    status: "Đang xử lý",
    createdAt: "2024-07-12",
  },
];
