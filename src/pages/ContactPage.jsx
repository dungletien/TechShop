import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    FacebookFilled,
    TwitterCircleFilled,
    InstagramFilled,
    YoutubeFilled,
    ThunderboltOutlined,
} from "@ant-design/icons";
import ContactForm from "../components/ContactForm";
import contactBanner from "../assets/images/banner/contactBanner.jpg";
import ChatSupportDrawer from '../components/ChatSupportDrawer';
import ChatSupportButton from '../components/ChatSupportButton';
import BackToTopButton from '../components/BackToTopButton';

const ContactPage = () => {
    const [chatVisible, setChatVisible] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="bg-gray-50 min-h-screen pb-16 pt-4 md:pt-6">
            {/* Breadcrumb */}
            <nav className="container mx-auto px-4 mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li>
                        <Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link>
                    </li>
                    <li>/</li>
                    <li className="text-gray-700 font-semibold">Liên hệ</li>
                </ol>
            </nav>

            {/* Hero Banner */}
            <section className="relative">
                <div className="w-full h-[500px] relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent z-10"
                        style={{
                            backgroundImage: `url('${contactBanner}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    <div className="container mx-auto px-4 h-full flex items-center relative z-20">
                        <div className="w-full md:w-1/2 pl-4 md:pl-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                                Liên Hệ Với Chúng Tôi
                            </h1>
                            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
                                Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh bên dưới hoặc gửi tin nhắn trực tiếp.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Section */}
            <div className="container mx-auto px-4 mt-8">
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    {/* Contact Info */}
                    {/* Contact Info */}
                    <div className="flex flex-col gap-6 lg:w-2/5 h-full">
                        <div className="grid grid-cols-1 gap-6 h-full">
                            {/* Phone */}
                            <div className="bg-white rounded-md border-t-4 border-blue-500 p-6 shadow hover:shadow-md transition flex-1">
                                <div className="text-center">
                                    <PhoneOutlined className="text-3xl text-blue-500 mb-3" />
                                    <h4 className="text-lg font-semibold mb-2">Gọi Cho Chúng Tôi</h4>
                                    <p className="text-gray-600 mb-2">
                                        <a href="tel:+842812345678" className="text-blue-600 hover:underline">
                                            (+84) 28 1234 5678
                                        </a>
                                    </p>

                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-md border-t-4 border-blue-500 p-6 shadow hover:shadow-md transition flex-1">
                                <div className="text-center">
                                    <MailOutlined className="text-3xl text-blue-500 mb-3" />
                                    <h4 className="text-lg font-semibold mb-2">Email</h4>
                                    <p className="text-gray-600 mb-2">
                                        <a href="mailto:info@yourstore.com" className="text-blue-600 hover:underline">
                                            info@yourstore.com
                                        </a>
                                    </p>


                                </div>
                            </div>

                            {/* Address */}
                            <div className="bg-white rounded-md border-t-4 border-blue-500 p-6 shadow hover:shadow-md transition flex-1">
                                <div className="text-center">
                                    <EnvironmentOutlined className="text-3xl text-blue-500 mb-3" />
                                    <h4 className="text-lg font-semibold mb-2">Địa Chỉ</h4>
                                    <p className="text-gray-600 mb-2">
                                        123 Lê Trọng Tấn, Thanh Xuân<br />
                                        Hà Nội, Việt Nam
                                    </p>

                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white rounded-md border-t-4 border-blue-500 p-6 shadow hover:shadow-md transition flex-1">
                                <div className="text-center">
                                    <ThunderboltOutlined className="text-3xl text-blue-500 mb-3" />
                                    <h4 className="text-lg font-semibold mb-2">Kết Nối Với Chúng Tôi</h4>
                                    <div className="flex justify-center space-x-6 mb-3">
                                        <a href="#" className="text-blue-600 hover:text-blue-800">
                                            <FacebookFilled style={{ fontSize: '28px' }} />
                                        </a>
                                        <a href="#" className="text-blue-400 hover:text-blue-600">
                                            <TwitterCircleFilled style={{ fontSize: '28px' }} />
                                        </a>
                                        <a href="#" className="text-pink-600 hover:text-pink-800">
                                            <InstagramFilled style={{ fontSize: '28px' }} />
                                        </a>
                                        <a href="#" className="text-red-600 hover:text-red-800">
                                            <YoutubeFilled style={{ fontSize: '28px' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-3/5">
                        <ContactForm />
                    </div>
                </div>

                {/* Map */}
                <div className="mt-8 bg-white rounded-md shadow-md p-6">
                    <h3 className="text-3xl font-bold text-center mb-5">
                        Tìm Chúng Tôi Trên Bản Đồ
                    </h3>
                    <div className="h-96 overflow-hidden rounded-md">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.967821150469!2d105.82887817503043!3d20.993926980646705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac6251fefa7f%3A0x702b4726776788c0!2zUC4gTMOqIFRy4buNbmcgVOG6pW4sIEtoxrDGoW5nIE1haSwgVGhhbmggWHXDom4sIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1751736278426!5m2!1sen!2s"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            
            <BackToTopButton showBackToTop={showBackToTop} scrollToTop={scrollToTop} />
            <ChatSupportButton onClick={() => setChatVisible(true)} />
            <ChatSupportDrawer open={chatVisible} onClose={() => setChatVisible(false)} />
        </div>
    );
};

export default ContactPage;
