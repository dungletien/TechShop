import React, { useState, useEffect } from "react";
import { bestSellers, newProducts } from "../constants/products";
import { useNavigate } from "react-router-dom";
import {
  UnorderedListOutlined,
  AppstoreOutlined,
  StarFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import BackToTopButton from "../components/BackToTopButton";
import ChatSupport from "../components/ChatSupport";
import { useCart } from "../components/CartContext";
import Breadcrumb from "../components/Breadcrumb";

const allProducts = [...bestSellers, ...newProducts];

const ProductList = () => {
  // State cho sort, pagination, view mode, drawer
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");

  const productsPerPage = 8;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const displayProducts = allProducts;

  // Pagination
  const totalPages = Math.ceil(displayProducts.length / productsPerPage);
  const displayedProducts = displayProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Reset page when sort option changes (keep UI behavior)
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption]);

  // Helper render rating stars
  const renderStars = (rating) => (
    <span className="flex text-yellow-400 mr-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarFilled
          key={i}
          className={
            i <= Math.floor(rating)
              ? "text-yellow-400"
              : "text-gray-200"
          }
        />
      ))}
    </span>
  );
  const breadcrumbItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Sản phẩm', path: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-4 md:pt-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Thanh điều hướng & sắp xếp */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-xl shadow flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 px-4 py-3">
          {/* Nút Bộ lọc */}
          <div className="flex items-center gap-2">
            <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
              Bộ lọc
            </button>
          </div>
          {/* Sắp xếp + chuyển đổi chế độ xem (giữ nguyên giao diện) */}
          <div className="flex items-center gap-4 justify-end flex-1">
            <span className="text-sm font-medium text-gray-700">
              Sắp xếp theo
            </span>
            <select
              className="px-4 py-2 border rounded-lg text-sm w-40"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="bestseller">Bán chạy</option>
            </select>
            <button
              className={`p-2 rounded ${viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => setViewMode("grid")}
              aria-label="Chế độ lưới"
            >
              <AppstoreOutlined />
            </button>
            <button
              className={`p-2 rounded ${viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => setViewMode("list")}
              aria-label="Chế độ danh sách"
            >
              <UnorderedListOutlined />
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="container mx-auto px-4 mb-12">
        {displayedProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl text-gray-300 mb-4">😕</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-500 mb-6">
              Không có sản phẩm nào phù hợp với lựa chọn của bạn.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative cursor-pointer group"
              >
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Mới
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">
                      Bán chạy
                    </span>
                  )}
                </div>
                <div
                  className="h-64 overflow-hidden"
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {product.brand}
                    </span>
                    <span className="mx-2 text-gray-300">
                      |
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-gray-800 line-clamp-2 h-14">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-red-600 mr-2">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                    <span className="ml-2 text-xs font-medium text-white bg-red-500 px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  </div>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                  >
                    <ShoppingCartOutlined /> Thêm vào giỏ
                    hàng
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative cursor-pointer group flex flex-col md:flex-row"
              >
                <div
                  className="w-full md:w-1/4 relative"
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                >
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Mới
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">
                        Bán chạy
                      </span>
                    )}
                  </div>
                  <div className="h-48 md:h-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/4 p-6 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {product.brand}
                    </span>
                    <span className="mx-2 text-gray-300">
                      |
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-xl mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map(
                        (feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-red-600 mr-2">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                      <span className="ml-2 text-xs font-medium text-white bg-red-500 px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    </div>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                    >
                      <ShoppingCartOutlined /> Thêm vào
                      giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Phân trang */}
      <div className="container mx-auto px-4 my-8 flex justify-center items-center gap-2">
        <button
          className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2 text-sm">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <BackToTopButton />
      <ChatSupport />

    </div>
  );
};

export default ProductList;
