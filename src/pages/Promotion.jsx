import React, { useState, useEffect } from 'react';
import { bestSellers, newProducts } from '../constants/products';
import { StarFilled, ShoppingCartOutlined, CopyOutlined, ThunderboltOutlined, FireOutlined, GiftOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import BackToTopButton from '../components/BackToTopButton';
import ChatSupportButton from '../components/ChatSupportButton';
import ChatSupportDrawer from '../components/ChatSupportDrawer';
import { useCart } from '../components/CartContext';

import bannerSale1 from "../assets/images/banner/bannerSale1.jpg";
import bannerSale2 from "../assets/images/banner/bannerSale2.jpg";

const allProducts = [...bestSellers, ...newProducts];
const promotionProducts = allProducts.filter(p => p.discount > 0);

// Dummy banners and coupon data
const sliderBanners = [
  bannerSale1,
  bannerSale2,
];
const categoryBanners = [
  { img: '/assets/images/icon/smartphone.png', label: 'Điện thoại' },
  { img: '/assets/images/icon/laptop.png', label: 'Laptop' },
  { img: '/assets/images/icon/tablet.png', label: 'Tablet' },
  { img: '/assets/images/icon/wrist-watch.png', label: 'Đồng hồ' },
];
const coupons = [
  { code: 'SALE50', condition: 'Giảm 50K cho đơn từ 1 triệu', expiry: '31/12/2024', color: 'rose' },
  { code: 'FREESHIP', condition: 'Miễn phí vận chuyển toàn quốc', expiry: '30/06/2024', color: 'blue' },
  { code: 'MEMBER10', condition: 'Giảm 10% cho thành viên mới', expiry: '31/12/2024', color: 'green' },
];
const couponColorClass = {
  rose: {
    border: 'border-rose-200',
    text: 'text-rose-600',
    bg: 'bg-rose-100',
    btn: 'bg-rose-500 hover:bg-rose-600',
  },
  blue: { 
    border: 'border-blue-200',
    text: 'text-blue-600',
    bg: 'bg-blue-100',
    btn: 'bg-blue-500 hover:bg-blue-600',
  },
  green: {
    border: 'border-green-200',
    text: 'text-green-600',
    bg: 'bg-green-100',
    btn: 'bg-green-500 hover:bg-green-600',
  },
  violet: {
    border: 'border-violet-200',
    text: 'text-violet-600',
    bg: 'bg-violet-100',
    btn: 'bg-violet-500 hover:bg-violet-600',
  },
};

const promoTabs = [
  { key: 'flash', label: 'Flash Sale', icon: <ThunderboltOutlined className="text-pink-500 text-lg mr-2" /> },
  { key: 'shock', label: 'Giảm giá sốc', icon: <FireOutlined className="text-orange-500 text-lg mr-2" /> },
  { key: 'combo', label: 'Combo tiết kiệm', icon: <GiftOutlined className="text-blue-500 text-lg mr-2" /> },
  { key: 'member', label: 'Ưu đãi thành viên', icon: <UserOutlined className="text-green-500 text-lg mr-2" /> },
];

function getTimeLeft() {
  // Dummy: luôn trả về 2 ngày 5 giờ 30 phút
  return '2 ngày 5h 30p';
}

const Promotion = () => {
  const [tab, setTab] = useState('flash');
  const [copied, setCopied] = useState('');
  const [bannerIdx, setBannerIdx] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const { addToCart } = useCart();

  // Tự động chuyển banner sau mỗi 3 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx(idx => (idx + 1) % sliderBanners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to top logic
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(''), 1500);
  };

  // Lọc sản phẩm theo tab (demo: tất cả tab đều trả về promotionProducts)
  const filteredProducts = promotionProducts;

  return (
    <div className="min-h-screen bg-gray-50 pt-4 md:pt-6 pb-12">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link></li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Khuyến mãi</li>
        </ol>
      </nav>
    {/* Banner Slider */}
    <div className="container mx-auto px-4">
      <div className="w-full max-w-[1800px] mx-auto rounded-2xl overflow-hidden shadow-xl mb-6 relative">
        <div
          className="w-full bg-gray-100 flex items-center justify-center rounded-2xl overflow-hidden"
          style={{ aspectRatio: '16/6', maxHeight: '400px' }}
        >
          <img
            src={sliderBanners[bannerIdx]}
            alt="Banner khuyến mãi"
            className="w-full h-full object-cover transition-all duration-500"
            style={{ background: '#f3f4f6' }}
          />
        </div>
        {/* Dots + click chuyển banner */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {sliderBanners.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${bannerIdx === idx ? 'bg-violet-500 scale-125' : 'bg-gray-300'}`}
              onClick={() => setBannerIdx(idx)}
              aria-label={`Chuyển đến banner ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  
    {/* Coupon section */}
    <div className="container mx-auto px-4 mb-10">
      <h2 className="text-xl font-bold mb-4 text-violet-700">🎟️ Mã giảm giá HOT</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {coupons.map(coupon => {
        const color = couponColorClass[coupon.color] || couponColorClass.violet;
        return (
          <div
            key={coupon.code}
            className={`bg-white rounded-xl shadow p-5 flex flex-col gap-2 border ${color.border}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-lg font-bold ${color.text} ${color.bg} px-3 py-1 rounded-lg tracking-widest`}>
                {coupon.code}
              </span>
              <button
                onClick={() => handleCopy(coupon.code)}
                className={`ml-2 px-2 py-1 rounded ${color.btn} text-white text-xs flex items-center gap-1`}
              >
                <CopyOutlined /> {copied === coupon.code ? 'Đã copy' : 'Copy'}
              </button>
            </div>
            <div className="text-gray-700 text-sm">{coupon.condition}</div>
            <div className="text-gray-400 text-xs">HSD: {coupon.expiry}</div>
          </div>
        );
      })}

      </div>
    </div>
  
    {/* Tab bar phân loại khuyến mãi */}
    <div className="container mx-auto px-4 mb-8">
      <div className="flex gap-4 border-b pb-2 mb-4 overflow-x-auto">
        {promoTabs.map(t => (
          <button
            key={t.key}
            className={`px-4 py-2 font-medium flex items-center whitespace-nowrap border-b-2 transition ${
              tab === t.key
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-gray-600 hover:text-violet-600'
            }`}
            onClick={() => setTab(t.key)}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
    </div>
  
    {/* Danh sách sản phẩm */}
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">🔥 Sản phẩm đang khuyến mãi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition flex flex-col border border-gray-100">
            <img src={product.image} alt={product.name} className="h-40 mx-auto object-contain mt-4" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <span className="text-lg font-bold text-rose-600 mr-2">{product.price}</span>
                <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                <span className="ml-2 text-xs font-medium text-white bg-rose-500 px-2 py-1 rounded-full">-{product.discount}%</span>
              </div>
              <div className="flex items-center mb-2 text-xs text-gray-500 gap-2">
                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">⏳ {getTimeLeft()}</span>
              </div>
              <div className="flex items-center mb-2">
                {[1,2,3,4,5].map(i => <StarFilled key={i} className={i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'} />)}
                <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <Link to={`/product/${product.id}`} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition text-center">Xem chi tiết</Link>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex-1 flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg py-2 px-4 text-sm font-medium transition"
                >
                  <ShoppingCartOutlined /> Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 py-12 text-lg">Hiện chưa có sản phẩm khuyến mãi.</div>
      )}
    </div>
    {/* Back to top button */}
    <BackToTopButton showBackToTop={showBackToTop} scrollToTop={scrollToTop} />
    {/* Chat support button */}
    <ChatSupportButton onClick={() => setChatVisible(true)} />
    {/* Chat support drawer */}
    <ChatSupportDrawer open={chatVisible} onClose={() => setChatVisible(false)} />
  </div>
  
  );
};

export default Promotion; 