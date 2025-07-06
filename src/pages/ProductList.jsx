import React, { useState, useEffect } from 'react';
import { categories } from '../constants/categories';
import { bestSellers, newProducts } from '../constants/products';
import { Link, useNavigate } from 'react-router-dom';
import { UnorderedListOutlined, AppstoreOutlined, FilterOutlined, StarFilled, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import BackToTopButton from '../components/BackToTopButton';
import ChatSupportButton from '../components/ChatSupportButton';
import { Drawer, Input, Button, Form } from 'antd';
import ChatSupportDrawer from '../components/ChatSupportDrawer';
import { useCart } from '../components/CartContext';

const allProducts = [...bestSellers, ...newProducts];

// Lấy danh sách brand, features, category từ dữ liệu
const brands = Array.from(new Set(allProducts.map(p => p.brand)));
const features = Array.from(new Set(allProducts.flatMap(p => p.features)));
const categoriesList = Array.from(new Set(allProducts.map(p => p.category)));

const ProductList = () => {
  // State cho filter, sort, pagination, view mode, drawer
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const productsPerPage = 8;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Filter logic
  const filteredProducts = allProducts.filter(product => {
    // Brand
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    // Category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    // Features
    if (selectedFeatures.length > 0 && !selectedFeatures.every(f => product.features.includes(f))) return false;
    // Rating
    if (selectedRating && Math.floor(product.rating) < selectedRating) return false;
    // Price
    const price = parseInt(product.price.replace(/\D/g, ''), 10) / 1000000;
    if (price < priceRange[0] || price > priceRange[1]) return false;
    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return parseInt(a.price.replace(/\D/g, ''), 10) - parseInt(b.price.replace(/\D/g, ''), 10);
    } else if (sortOption === 'price-desc') {
      return parseInt(b.price.replace(/\D/g, ''), 10) - parseInt(a.price.replace(/\D/g, ''), 10);
    } else if (sortOption === 'bestseller') {
      return b.isBestSeller ? 1 : -1;
    } else {
      // newest
      return b.isNew ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const displayedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Reset page when filter changes
  useEffect(() => { setCurrentPage(1); }, [selectedBrands, selectedCategories, selectedFeatures, selectedRating, priceRange, sortOption]);

  // Scroll to top logic
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper render rating stars
  const renderStars = (rating) => (
    <span className="flex text-yellow-400 mr-2">
      {[1,2,3,4,5].map(i => <StarFilled key={i} className={i <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'} />)}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-4 md:pt-6">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link></li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Sản phẩm</li>
        </ol>
      </nav>

      {/* Thanh điều hướng & bộ lọc */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-xl shadow flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 px-4 py-3">
          {/* Nút Bộ lọc */}
          <div className="flex items-center gap-2">
            <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition" onClick={() => setFilterDrawer(true)}>
              <FilterOutlined className="mr-2" /> Bộ lọc
            </button>
          </div>
          {/* Sắp xếp + chuyển đổi chế độ xem (bên phải) */}
          <div className="flex items-center gap-4 justify-end flex-1">
            <span className="text-sm font-medium text-gray-700">Sắp xếp theo</span>
            <select className="px-4 py-2 border rounded-lg text-sm w-40" value={sortOption} onChange={e => setSortOption(e.target.value)}>
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="bestseller">Bán chạy</option>
            </select>
            <button className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setViewMode('grid')} aria-label="Chế độ lưới"><AppstoreOutlined /></button>
            <button className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setViewMode('list')} aria-label="Chế độ danh sách"><UnorderedListOutlined /></button>
          </div>
        </div>
      </div>

      {/* Tag filter summary */}
      <div className="container mx-auto px-4 mb-4 flex flex-wrap gap-2 items-center">
        {selectedCategories.map(cat => (
          <span key={cat} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer" onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}>{cat} ✕</span>
        ))}
        {selectedBrands.map(brand => (
          <span key={brand} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer" onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))}>{brand} ✕</span>
        ))}
        {selectedFeatures.map(f => (
          <span key={f} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer" onClick={() => setSelectedFeatures(selectedFeatures.filter(x => x !== f))}>{f} ✕</span>
        ))}
        {selectedRating && <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer" onClick={() => setSelectedRating(null)}>{selectedRating}★ trở lên ✕</span>}
        {(priceRange[0] > 0 || priceRange[1] < 50) && <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer" onClick={() => setPriceRange([0,50])}>{priceRange[0]} - {priceRange[1]} triệu ✕</span>}
        {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedFeatures.length > 0 || selectedRating || priceRange[0] > 0 || priceRange[1] < 50) && (
          <button className="ml-2 text-red-500 text-xs font-medium underline" onClick={() => {setSelectedCategories([]);setSelectedBrands([]);setSelectedFeatures([]);setSelectedRating(null);setPriceRange([0,50]);}}>Xóa bộ lọc</button>
        )}
      </div>

      {/* Drawer bộ lọc (giả lập bằng modal đơn giản) */}
      {filterDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-black bg-opacity-30 flex-1" onClick={() => setFilterDrawer(false)}></div>
          <div className="w-full max-w-xs bg-white h-full shadow-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Bộ lọc sản phẩm</h3>
              <button onClick={() => setFilterDrawer(false)} className="text-gray-500 hover:text-red-500 text-xl">×</button>
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Danh mục</h4>
              {categoriesList.map(cat => (
                <label key={cat} className="flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={e => setSelectedCategories(e.target.checked ? [...selectedCategories, cat] : selectedCategories.filter(c => c !== cat))} className="mr-2" />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Thương hiệu</h4>
              {brands.map(brand => (
                <label key={brand} className="flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={e => setSelectedBrands(e.target.checked ? [...selectedBrands, brand] : selectedBrands.filter(b => b !== brand))} className="mr-2" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Tính năng</h4>
              {features.map(f => (
                <label key={f} className="flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" checked={selectedFeatures.includes(f)} onChange={e => setSelectedFeatures(e.target.checked ? [...selectedFeatures, f] : selectedFeatures.filter(x => x !== f))} className="mr-2" />
                  <span>{f}</span>
                </label>
              ))}
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Đánh giá</h4>
              {[5,4,3,2,1].map(r => (
                <label key={r} className="flex items-center mb-2 cursor-pointer">
                  <input type="radio" checked={selectedRating === r} onChange={() => setSelectedRating(r)} className="mr-2" />
                  <span>{r}★ trở lên</span>
                </label>
              ))}
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Khoảng giá (triệu VNĐ)</h4>
              <div className="flex items-center gap-2 mb-2">
                <input type="number" min={0} max={priceRange[1]} value={priceRange[0]} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-16 border rounded px-2 py-1" />
                <span>-</span>
                <input type="number" min={priceRange[0]} max={50} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-16 border rounded px-2 py-1" />
              </div>
              <div className="text-xs text-gray-500">Từ 0 đến 50 triệu</div>
            </div>
            <div className="flex justify-between mt-8">
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-700" onClick={() => {setSelectedCategories([]);setSelectedBrands([]);setSelectedFeatures([]);setSelectedRating(null);setPriceRange([0,50]);}}>Xóa bộ lọc</button>
              <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => setFilterDrawer(false)}>Áp dụng</button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="container mx-auto px-4 mb-12">
        {displayedProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl text-gray-300 mb-4">😕</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-gray-500 mb-6">Không có sản phẩm nào phù hợp với bộ lọc của bạn. Vui lòng thử lại với các tiêu chí khác.</p>
            <button className="px-6 py-2 rounded bg-blue-600 text-white" onClick={() => {setSelectedCategories([]);setSelectedBrands([]);setSelectedFeatures([]);setSelectedRating(null);setPriceRange([0,50]);}}>Xóa bộ lọc</button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative cursor-pointer group"
              >
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  {product.isNew && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Mới</span>}
                  {product.isBestSeller && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">Bán chạy</span>}
                </div>
                <div className="h-64 overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top transition-transform group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">{product.brand}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-gray-800 line-clamp-2 h-14">{product.name}</h3>
                  <div className="flex items-center mb-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-red-600 mr-2">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    <span className="ml-2 text-xs font-medium text-white bg-red-500 px-2 py-1 rounded-full">-{product.discount}%</span>
                  </div>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition flex items-center justify-center gap-2"
                    onClick={e => { e.stopPropagation(); addToCart(product, 1); }}
                  >
                    <ShoppingCartOutlined /> Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {displayedProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative cursor-pointer group flex flex-col md:flex-row"
              >
                <div className="w-full md:w-1/4 relative" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isNew && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Mới</span>}
                    {product.isBestSeller && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">Bán chạy</span>}
                  </div>
                  <div className="h-48 md:h-full overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top transition-transform group-hover:scale-105" />
                  </div>
                </div>
                <div className="w-full md:w-3/4 p-6 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">{product.brand}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                  <h3 className="font-medium text-xl mb-2 text-gray-800">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{feature}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-red-600 mr-2">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      <span className="ml-2 text-xs font-medium text-white bg-red-500 px-2 py-1 rounded-full">-{product.discount}%</span>
                    </div>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition flex items-center gap-2"
                      onClick={e => { e.stopPropagation(); addToCart(product, 1); }}
                    >
                      <ShoppingCartOutlined /> Thêm vào giỏ hàng
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
        <button className="px-3 py-1 rounded border bg-white disabled:opacity-50" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
        <span className="mx-2 text-sm">Trang {currentPage} / {totalPages}</span>
        <button className="px-3 py-1 rounded border bg-white disabled:opacity-50" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
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

export default ProductList; 