import React from "react";
import { Button, Badge} from "antd";
import {
    ShoppingCartOutlined
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import heroBanner from "../assets/images/hero-banner2.jpg";
import heroBanner1 from "../assets/images/hero-banner1.jpg";
import BackToTopButton from '../components/BackToTopButton';
import ChatSupport from '../components/ChatSupport';

const Home = ({
    categories,
    bestSellers,
    newProducts,
    addToCart,
}) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <section className="relative">
                <div className="w-full h-[500px] relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent z-10"
                        style={{
                            backgroundImage: `url('${heroBanner}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    <div className="container mx-auto px-4 h-full flex items-center relative z-20">
                        <div className="w-full md:w-1/2 pl-4 md:pl-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                                Công Nghệ Mới Nhất
                            </h1>
                            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
                                Khám phá những sản phẩm công nghệ hàng đầu với
                                thiết kế hiện đại, hiệu năng vượt trội và ưu đãi
                                giới hạn.
                            </p>
                            <Button
                                type="primary"
                                size="large"
                                className="!rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-12 px-8 text-base font-semibold"
                            >
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Danh Mục Nổi Bật
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="h-32 flex items-center justify-center">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="max-h-20 object-contain transition-transform hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-medium text-gray-800">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Sản Phẩm Bán Chạy
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bestSellers.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-top transition-transform hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-medium text-lg mb-2 text-gray-800 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-xl font-bold text-red-600 mr-2">
                                            {product.price}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            {product.originalPrice}
                                        </span>
                                    </div>
                                    <Button
                                        type="primary"
                                        block
                                        icon={<ShoppingCartOutlined />}
                                        onClick={addToCart}
                                        className="!rounded-button bg-blue-600 hover:bg-blue-700 border-none whitespace-nowrap cursor-pointer"
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promotion Banner */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div
                        className="rounded-2xl overflow-hidden relative h-80"
                        style={{
                            backgroundImage: `url('${heroBanner1}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
                            <div className="ml-16 w-1/2">
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    Khuyến Mãi Đặc Biệt
                                </h2>
                                <p className="text-xl text-white/90 mb-8">
                                    Giảm đến 50% cho các sản phẩm công nghệ hàng
                                    đầu. Chỉ áp dụng đến hết ngày 30/06/2025!
                                </p>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="!rounded-button bg-red-600 hover:bg-red-700 border-none h-12 px-8 text-base font-medium whitespace-nowrap cursor-pointer"
                                >
                                    Xem ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Products */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Sản Phẩm Mới
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {newProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative cursor-pointer"
                            >
                                <div className="absolute top-4 right-4 z-10">
                                    <Badge.Ribbon text="New" color="green" />
                                </div>
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-top transition-transform hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-medium text-lg mb-2 text-gray-800 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <span className="text-xl font-bold text-red-600 mr-2">
                                            {product.price}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            {product.originalPrice}
                                        </span>
                                    </div>
                                    <Button
                                        type="primary"
                                        block
                                        icon={<ShoppingCartOutlined />}
                                        onClick={addToCart}
                                        className="!rounded-button bg-blue-600 hover:bg-blue-700 border-none whitespace-nowrap cursor-pointer"
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Khách Hàng Nói Gì Về Chúng Tôi
                    </h2>

                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="pb-12"
                    >
                        {[1, 2, 3, 4, 5].map((item) => (
                            <SwiperSlide key={item}>
                                <div className="bg-gray-50 p-8 rounded-xl h-full">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                            <i className="fas fa-user text-blue-600"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                Khách Hàng {item}
                                            </h4>
                                            <div className="flex text-yellow-400">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">
                                        "Tôi rất hài lòng với trải nghiệm mua
                                        sắm tại TechShop. Sản phẩm chất lượng,
                                        giao hàng nhanh chóng và dịch vụ khách
                                        hàng tuyệt vời. Chắc chắn sẽ quay lại
                                        mua sắm lần nữa!"
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Back to top button */}
            <BackToTopButton/>

            {/* Chat support button */}
            <ChatSupport />

        </div>
    );
};

export default Home;
