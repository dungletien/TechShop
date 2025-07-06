//bestSellers
import iphoneImg from '../assets/images/product-img/iphone-15-pro-max.jpg';
import samsungImg from '../assets/images/product-img/samsung-galaxy-s24-ultra.jpg';
import macbookImg from '../assets/images/product-img/macbook-pro-13.jpg';
import ipadImg from '../assets/images/product-img/ipad-pro.jpg';

//newProducts
import taingheSony from '../assets/images/product-img/tai-nghe-sony.jpg';
import appleWacthS9 from '../assets/images/product-img/apple-watch-s9.jpg';
import samsungS24Ultra from '../assets/images/product-img/samsung-galaxy-s24-ultra.jpg';
import flycam4 from '../assets/images/product-img/flycam-dji-mini-4.jpg';


//ipad images
import ipadImg1 from '../assets/images/product-img/ipad-img/ipad-pro-11-inch-m2-1.png';
import ipadImg2 from '../assets/images/product-img/ipad-img/ipad-pro-11-inch-m2-2.png';
import ipadImg3 from '../assets/images/product-img/ipad-img/ipad-pro-11-inch-m2-4.png';
import ipadImg4 from '../assets/images/product-img/ipad-img/ipad-pro-11-inch-m2-5.png';

export const bestSellers = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    price: '29.990.000₫',
    originalPrice: '32.990.000₫',
    image: iphoneImg,
    brand: 'Apple',
    category: 'Điện thoại',
    features: ['Camera tốt', 'Sạc nhanh', 'Chống nước'],
    rating: 4.9,
    isNew: false,
    isBestSeller: true,
    discount: 9
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: '27.990.000₫',
    originalPrice: '29.990.000₫',
    image: samsungImg,
    brand: 'Samsung',
    category: 'Điện thoại',
    features: ['Pin trâu', 'Camera tốt'],
    rating: 4.8,
    isNew: false,
    isBestSeller: true,
    discount: 7
  },
  {
    id: 3,
    name: 'MacBook Pro M3 Pro',
    price: '42.990.000₫',
    originalPrice: '45.990.000₫',
    image: macbookImg,
    brand: 'Apple',
    category: 'Laptop',
    features: ['Màn hình lớn', 'Pin trâu'],
    rating: 4.7,
    isNew: false,
    isBestSeller: true,
    discount: 7
  },
  {
    id: 4,
    name: 'iPad Pro M2',
    price: '22.990.000₫',
    originalPrice: '24.990.000₫',
    image: ipadImg,
    images: [ipadImg1, ipadImg2, ipadImg3, ipadImg4],
    brand: 'Apple',
    category: 'Máy tính bảng',
    features: ['Màn hình lớn', 'Sạc nhanh'],
    rating: 4.8,
    isNew: false,
    isBestSeller: true,
    discount: 8
  }
];

export const newProducts = [
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    price: '7.990.000₫',
    originalPrice: '8.990.000₫',
    image: taingheSony,
    brand: 'Sony',
    category: 'Tai nghe',
    features: ['Chống nước', 'Sạc nhanh'],
    rating: 4.7,
    isNew: true,
    isBestSeller: false,
    discount: 11
  },
  {
    id: 6,
    name: 'Apple Watch Series 9',
    price: '9.990.000₫',
    originalPrice: '10.990.000₫',
    image: appleWacthS9,
    brand: 'Apple',
    category: 'Đồng hồ thông minh',
    features: ['Chống nước', 'Pin trâu'],
    rating: 4.8,
    isNew: true,
    isBestSeller: false,
    discount: 9
  },
  {
    id: 7,
    name: 'Samsung Galaxy Tab S9 Ultra',
    price: '19.990.000₫',
    originalPrice: '21.990.000₫',
    image: samsungS24Ultra,
    brand: 'Samsung',
    category: 'Máy tính bảng',
    features: ['Màn hình lớn', 'Sạc nhanh'],
    rating: 4.7,
    isNew: true,
    isBestSeller: false,
    discount: 9
  },
  {
    id: 8,
    name: 'DJI Mini 4 Pro',
    price: '15.990.000₫',
    originalPrice: '17.990.000₫',
    image: flycam4,
    brand: 'DJI',
    category: 'Phụ kiện',
    features: ['Camera tốt', 'Pin trâu'],
    rating: 4.6,
    isNew: true,
    isBestSeller: false,
    discount: 11
  }
]; 