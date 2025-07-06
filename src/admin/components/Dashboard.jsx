import React from 'react';
import { Card, Statistic, Row, Col, Button } from 'antd';
import { 
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons';
import ProductsTable from './ProductsTable';

const Dashboard = ({ products }) => {
  return (
    <div>
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={112893}
              prefix={<DollarOutlined />}
              suffix="₫"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn hàng"
              value={1128}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sản phẩm"
              value={93}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Khách hàng"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Products Table */}
      <Card 
        title="Sản phẩm gần đây" 
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm sản phẩm
          </Button>
        }
      >
        <ProductsTable products={products} />
      </Card>
    </div>
  );
};

export default Dashboard; 