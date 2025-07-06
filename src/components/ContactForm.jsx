import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Vui lòng nhập họ tên của bạn!';
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ!';
    }
    if (!formData.subject) newErrors.subject = 'Vui lòng nhập chủ đề!';
    if (!formData.message) newErrors.message = 'Vui lòng nhập nội dung!';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Success:', formData);
      alert('Tin nhắn đã được gửi!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } else {
      console.log('Failed:', newErrors);
    }
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-0 h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r to-indigo-600 p-5 border-b text-center">
        <h2 className="text-2xl md:text-3xl font-bold m-0">
          Gửi Tin Nhắn Cho Chúng Tôi
        </h2>
      </div>

      {/* Form */}
      <div className="p-6 bg-gray-50 flex-grow flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Họ Tên */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Họ Tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ tên của bạn"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập địa chỉ email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Số điện thoại */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Số Điện Thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại của bạn (không bắt buộc)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Chủ đề */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Chủ Đề</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Nhập chủ đề tin nhắn"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>

          {/* Nội dung */}
          <div className="flex-grow mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Nội Dung</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Viết nội dung tin nhắn của bạn tại đây..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition min-h-[100px]"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit */}
          <div className="mt-auto">
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition"
            >
              Gửi Tin Nhắn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
