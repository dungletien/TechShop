import React from 'react';
import { Table, Avatar, Badge, Space, Button } from 'antd';
import { 
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';

const ProductsTable = ({ products }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div className="flex items-center">
          <Avatar size={40} className="mr-3 bg-blue-500">
            {text.charAt(0)}
          </Avatar>
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className="font-semibold text-green-600">{price}</span>,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Badge 
          count={stock} 
          showZero 
          color={stock > 10 ? 'green' : stock > 5 ? 'orange' : 'red'}
        />
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status === 'active' ? 'Hoạt động' : 'Tạm ngưng'} 
        />
      ),
    },
    {
      title: 'Đã bán',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales) => <span className="text-blue-600 font-medium">{sales}</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={products} 
      pagination={{ pageSize: 10 }}
      scroll={{ x: 800 }}
    />
  );
};

export default ProductsTable; 