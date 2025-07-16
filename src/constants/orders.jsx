// 📌 Import dữ liệu mẫu sản phẩm
import { bestSellers, newProducts } from "./products";

// Gộp hết sản phẩm vào 1 mảng để dễ chọn
const allProducts = [...bestSellers, ...newProducts];

export const orders = [
  {
    id: 1,
    userEmail: "user@gmail.com",
    userName: "Trần Thị User",
    date: "2025-07-10 09:30",
    status: "Đang xử lý",
    address: "123 Lê Lợi, Quận 1, TP.HCM",
    paymentMethod: "Thanh toán khi nhận hàng",
    items: [
      {
        productId: allProducts[0].id,
        name: allProducts[0].name,
        image: allProducts[0].image,
        quantity: 1,
        price: 29990000, // giá dạng số để dễ tính
      },
      {
        productId: allProducts[4].id,
        name: allProducts[4].name,
        image: allProducts[4].image,
        quantity: 2,
        price: 7990000,
      },
    ],
  },
  {
    id: 2,
    userEmail: "leminh@gmail.com",
    userName: "Lê Minh Quân",
    date: "2025-07-12 14:20",
    status: "Đang giao hàng",
    address: "45 Nguyễn Huệ, Quận 1, TP.HCM",
    paymentMethod: "Chuyển khoản ngân hàng",
    items: [
      {
        productId: allProducts[1].id,
        name: allProducts[1].name,
        image: allProducts[1].image,
        quantity: 1,
        price: 27990000,
      },
    ],
  },
  {
    id: 3,
    userEmail: "hoanglan@gmail.com",
    userName: "Hoàng Lan Anh",
    date: "2025-07-14 10:45",
    status: "Đã giao",
    address: "89 Trần Hưng Đạo, Quận 5, TP.HCM",
    paymentMethod: "Thanh toán qua ví điện tử",
    items: [
      {
        productId: allProducts[2].id,
        name: allProducts[2].name,
        image: allProducts[2].image,
        quantity: 1,
        price: 42990000,
      },
      {
        productId: allProducts[5].id,
        name: allProducts[5].name,
        image: allProducts[5].image,
        quantity: 1,
        price: 9990000,
      },
    ],
  },
  {
    id: 4,
    userEmail: "phamthao@gmail.com",
    userName: "Phạm Thảo My",
    date: "2025-07-15 19:15",
    status: "Đã giao",
    address: "12 Lý Thường Kiệt, Quận 10, TP.HCM",
    paymentMethod: "Thanh toán khi nhận hàng",
    items: [
      {
        productId: allProducts[7].id,
        name: allProducts[7].name,
        image: allProducts[7].image,
        quantity: 3,
        price: 15990000,
      },
    ],
  },
];
