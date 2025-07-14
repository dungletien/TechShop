import React, { useState, useEffect } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

const BackToTopButton = ({ threshold = 300 }) => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > threshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!showBackToTop) return null;

    return (
        <button
            onClick={scrollToTop}
            className="!rounded-button fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-50 cursor-pointer whitespace-nowrap"
        >
            <ArrowUpOutlined />
        </button>
    );
};

export default BackToTopButton;
