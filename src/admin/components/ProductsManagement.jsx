import React from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProductsTable from './ProductsTable';

const ProductsManagement = ({ products }) => {
  return (
    <Card title="Quản lý sản phẩm">
      <div className="mb-4">
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm sản phẩm mới
        </Button>
      </div>
      <ProductsTable products={products} />
    </Card>
  );
};

export default ProductsManagement; 