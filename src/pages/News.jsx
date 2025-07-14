import React from 'react';
import { Link } from 'react-router-dom';
import newsIphone from '../assets/images/news/iphone.png';
import newsLaptop from '../assets/images/news/laptop.jpg';
import newsWatch from '../assets/images/news/watch.jpg';
import newsTablet from '../assets/images/news/tablet.jpg';
import ChatSupport from '../components/ChatSupport';
import BackToTopButton from '../components/BackToTopButton';
import Breadcrumb from "../components/Breadcrumb";

const newsList = [
  {
    id: 1,
    title: 'Apple ra mắt iPhone mới với nhiều cải tiến vượt trội',
    image: newsIphone,
    date: '2024-06-01',
    excerpt: 'Apple vừa chính thức trình làng dòng iPhone mới với chip mạnh hơn, camera nâng cấp và nhiều tính năng thông minh hỗ trợ AI.',
  },
  {
    id: 2,
    title: 'Top 5 laptop đáng mua nhất mùa hè 2024',
    image: newsLaptop,
    date: '2024-05-28',
    excerpt: 'Bạn đang tìm kiếm một chiếc laptop phù hợp cho học tập, làm việc hay giải trí? Dưới đây là 5 lựa chọn tốt nhất năm nay.',
  },
  {
    id: 3,
    title: 'Xu hướng thiết bị đeo thông minh năm 2024',
    image: newsWatch,
    date: '2024-05-20',
    excerpt: 'Thiết bị đeo thông minh ngày càng đa dạng về mẫu mã, tính năng và giá thành. Cùng điểm qua những xu hướng nổi bật nhất.',
  },
  {
    id: 4,
    title: 'So sánh máy tính bảng Android và iPad: Nên chọn gì?',
    image: newsTablet,
    date: '2024-05-15',
    excerpt: 'Máy tính bảng Android và iPad đều có ưu nhược điểm riêng. Bài viết này sẽ giúp bạn lựa chọn phù hợp nhu cầu.',
  },
];

const News = () => {
  const breadcrumbItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Tin tức', path: null }
];
  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-4 md:pt-6 ">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Tin tức công nghệ</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newsList.map(news => (
            <div key={news.id} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden">
              <img src={news.image} alt={news.title} className="h-48 w-full object-cover" />
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-gray-400 mb-2">{new Date(news.date).toLocaleDateString('vi-VN')}</div>
                <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">{news.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.excerpt}</p>
                <Link to={`/news/${news.id}`} className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition text-center">Xem chi tiết</Link>
              </div>
            </div>
          ))}
        </div>
      <BackToTopButton/>
      <ChatSupport />
    </div>
  );
};

export default News; 