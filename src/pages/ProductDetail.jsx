import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { StarFilled, LeftOutlined } from '@ant-design/icons';
import BackToTopButton from '../components/BackToTopButton';
import ChatSupport from '../components/ChatSupport';
import { bestSellers, newProducts } from '../constants/products';
import { useCart } from '../components/CartContext';

const allProducts = [...bestSellers, ...newProducts];
const capacityOptions = ['128GB', '256GB', '512GB'];

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find(p => String(p.id) === String(id));
  const { addToCart } = useCart();

  // Hooks luôn ở đầu hàm, dùng product? để tránh lỗi khi product chưa có
  const colorOptions = (product?.colors || [
    { name: 'Xanh', value: 'blue', color: 'bg-blue-400', image: product?.images?.[0] || product?.image },
    { name: 'Xám', value: 'gray', color: 'bg-gray-400', image: product?.images?.[1] || product?.image },
    { name: 'Vàng', value: 'yellow', color: 'bg-yellow-300', image: product?.images?.[2] || product?.image },
  ]);

  const otherProducts = useMemo(() => {
    if (!product) return [];
    const filteredProducts = allProducts.filter(p => p.id !== product.id);
    const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [product]);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(capacityOptions[0]);
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [tab, setTab] = useState('description');
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Không tìm thấy sản phẩm</h2>
        <Link to="/products" className="text-blue-600 hover:underline">Quay lại danh sách sản phẩm</Link>
      </div>
    );
  }

  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb + Back button */}
      <div className="container mx-auto px-4 mt-6 flex items-center gap-4">
        <button onClick={() => navigate('/products')} className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium"><LeftOutlined className="mr-1" />Quay lại</button>
        <span className="mx-2 text-gray-400">|</span>
        <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-semibold">{product.name}</span>
        </nav>
      </div>
      {/* Main product info */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="col-span-1 flex">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full">
              <div className="w-full h-96 flex items-center justify-center mb-4">
                <img src={selectedImage} alt={product.name} className="max-h-80 object-contain rounded-lg shadow cursor-zoom-in transition-all duration-200" />
              </div>
              <div className="flex gap-3 justify-center">
                {galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`h-16 w-16 object-contain rounded border cursor-pointer transition-all duration-150 ${selectedImage === img ? 'border-2 border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Info */}
          <div className="col-span-1 flex">
            <div className="bg-white rounded-xl shadow p-8 w-full flex flex-col justify-between h-full">
              <div>
                <h1 className="text-2xl font-bold mb-4 break-words leading-tight">{product.name}</h1>
                <div className="mb-4 text-gray-500 text-base">Thương hiệu: <span className="font-medium text-gray-700">{product.brand}</span></div>
                <div className="flex items-end gap-3 mb-6 flex-wrap">
                  <span className="text-3xl font-bold text-red-600">{product.price}</span>
                  <span className="text-base text-gray-400 line-through">{product.originalPrice}</span>
                  <span className="text-xs font-medium text-white bg-red-500 px-2 py-1 rounded-full">-{product.discount}%</span>
                </div>
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4, 5].map(i => <StarFilled key={i} className={i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'} />)}
                  <span className="ml-2 text-gray-600 text-base">{product.rating.toFixed(1)} <span className="text-sm">(99 đánh giá)</span></span>
                </div>
                {/* Tùy chọn cấu hình */}
                <div className="mb-8">
                  <div className="mb-2 text-sm font-medium">Dung lượng:</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {capacityOptions.map(cap => (
                      <button
                        key={cap}
                        className={`px-4 py-2 rounded border font-medium min-w-[80px] text-center transition ${selectedCapacity === cap ? 'border-blue-500 text-blue-600 bg-blue-50' : 'text-gray-600 hover:border-blue-300'}`}
                        onClick={() => setSelectedCapacity(cap)}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                  <div className="mb-2 text-sm font-medium">Màu sắc:</div>
                  <div className="flex gap-3 flex-wrap">
                    {colorOptions.map((color, idx) => (
                      <button
                        key={color.value}
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${selectedColor.value === color.value ? 'border-2 border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-blue-300'} ${color.color}`}
                        onClick={() => {
                          setSelectedColor(color);
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6 w-full">
                <button className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-lg">Mua ngay</button>
                <button
                  className="flex-1 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition text-lg"
                  onClick={() => addToCart(product, 1)}
                >Thêm vào giỏ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="container mx-auto px-4 mt-12">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex gap-6 border-b mb-6">
            <button className={`pb-2 font-medium ${tab === 'description' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`} onClick={() => setTab('description')}>Mô tả sản phẩm</button>
            <button className={`pb-2 font-medium ${tab === 'specs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`} onClick={() => setTab('specs')}>Thông số kỹ thuật</button>
            <button className={`pb-2 font-medium ${tab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`} onClick={() => setTab('reviews')}>Đánh giá</button>
            <button className={`pb-2 font-medium ${tab === 'faq' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`} onClick={() => setTab('faq')}>Hỏi đáp</button>
            <button className={`pb-2 font-medium ${tab === 'warranty' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`} onClick={() => setTab('warranty')}>Bảo hành</button>
          </div>
          <div>
            {tab === 'description' && (
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Sản phẩm thuộc dòng công nghệ cao cấp, thiết kế hiện đại, nhỏ gọn và tiện lợi, đáp ứng tốt nhu cầu học tập, làm việc và giải trí. Với cấu hình mạnh mẽ cùng nhiều tính năng thông minh, đây là lựa chọn lý tưởng cho người dùng cá nhân lẫn doanh nghiệp.
                </p>
                <p>
                  Thiết bị được hoàn thiện với vật liệu cao cấp, tối ưu trải nghiệm người dùng từ hiệu năng đến thời lượng pin. Sản phẩm tương thích với nhiều phụ kiện thông minh, hỗ trợ tối đa cho môi trường học tập và làm việc linh hoạt.
                </p>
              </div>
            )}
            {tab === 'specs' && (
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p><strong>Màn hình:</strong> Công nghệ IPS / OLED / Retina, kích thước từ 6 đến 13 inch</p>
                <p><strong>Chip xử lý:</strong> Đa nhân hiệu suất cao (Snapdragon / Apple / Intel / MediaTek)</p>
                <p><strong>Bộ nhớ:</strong> RAM từ 4GB đến 16GB</p>
                <p><strong>Lưu trữ:</strong> 64GB / 128GB / 256GB / 512GB / 1TB</p>
                <p><strong>Camera:</strong> Camera sau và trước với độ phân giải cao, hỗ trợ AI</p>
                <p><strong>Kết nối:</strong> Wi-Fi, Bluetooth, GPS, 5G (tùy phiên bản)</p>
                <p><strong>Hệ điều hành:</strong> Android / iOS / iPadOS / Windows</p>
                <p><strong>Pin:</strong> Dung lượng cao, hỗ trợ sạc nhanh</p>
                <p><strong>Khác:</strong> Bảo mật vân tay, nhận diện khuôn mặt, chống nước (IP67/IP68)</p>
              </div>
            )}
            {tab === 'reviews' && (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <p className="font-semibold text-gray-800">Người dùng A</p>
                  <p className="text-yellow-400">★★★★★</p>
                  <p className="text-gray-600 text-sm mt-1">Sản phẩm chất lượng, xứng đáng với giá tiền. Hiệu suất mượt mà, thiết kế đẹp.</p>
                </div>
                <div className="border-b pb-4">
                  <p className="font-semibold text-gray-800">Người dùng B</p>
                  <p className="text-yellow-400">★★★★☆</p>
                  <p className="text-gray-600 text-sm mt-1">Máy dùng ổn, pin bền, chỉ hơi nặng khi cầm lâu.</p>
                </div>
                <div className="text-sm text-blue-600 hover:underline cursor-pointer">Xem thêm đánh giá</div>
              </div>
            )}
            {tab === 'faq' && (
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-semibold">❓ Sản phẩm có bảo hành không?</p>
                  <p>Có. Sản phẩm được bảo hành chính hãng 12 tháng.</p>
                </div>
                <div>
                  <p className="font-semibold">❓ Có hỗ trợ trả góp không?</p>
                  <p>Có hỗ trợ trả góp qua thẻ tín dụng và công ty tài chính.</p>
                </div>
                <div>
                  <p className="font-semibold">❓ Bao lâu thì nhận được hàng?</p>
                  <p>Thông thường từ 1–3 ngày làm việc tùy khu vực.</p>
                </div>
              </div>
            )}
            {tab === 'warranty' && (
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Tất cả sản phẩm đều được bảo hành chính hãng trong vòng 12 tháng, áp dụng theo chính sách của nhà sản xuất. Trung tâm bảo hành có mặt trên toàn quốc.
                </p>
                <ul className="list-disc pl-5">
                  <li>Hỗ trợ đổi mới trong 7–30 ngày đầu nếu lỗi kỹ thuật</li>
                  <li>Bảo hành phần cứng, pin, sạc theo quy định của hãng</li>
                  <li>Miễn phí công sửa chữa trong thời gian bảo hành</li>
                </ul>
                <p>Quý khách vui lòng giữ hóa đơn và hộp sản phẩm để được hỗ trợ tốt nhất.</p>
              </div>
            )}

          </div>
        </div>
      </div>
      {/* Related products */}
      <div className="container mx-auto px-4 mt-12 mb-24">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm khác</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {otherProducts.map(item => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col">
              <img src={item.image} alt={item.name} className="h-40 mx-auto object-contain" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-2">{item.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold text-red-600 mr-2">{item.price}</span>
                  <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map(i => <StarFilled key={i} className={i <= Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-200'} />)}
                  <span className="ml-2 text-gray-600">{item.rating.toFixed(1)}</span>
                </div>
                <button
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to top & chat support */}
      <BackToTopButton />
      <ChatSupport />
    </div>
  );
};

export default ProductDetail; 