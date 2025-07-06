import React from 'react';
import { Drawer, List, Button, InputNumber, Typography, Divider, Empty, Popconfirm } from 'antd';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const CartDrawer = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <Drawer
      title={<span className="font-bold text-lg">Giỏ hàng của bạn</span>}
      placement="right"
      onClose={onClose}
      open={open}
      width={380}
      footer={
        cart.length > 0 && (
          <div className="flex flex-col gap-2">
            <Divider />
            <div className="flex justify-between items-center mb-2">
              <Text strong>Tổng cộng:</Text>
              <Text strong className="text-lg text-green-600">{totalPrice.toLocaleString()}₫</Text>
            </div>
            <Button type="primary" block size="large" className="mb-2" onClick={() => { onClose(); navigate('/checkout'); }}>Thanh toán</Button>
            <Popconfirm title="Xóa toàn bộ giỏ hàng?" onConfirm={clearCart} okText="Xóa" cancelText="Hủy">
              <Button block danger>Xóa giỏ hàng</Button>
            </Popconfirm>
          </div>
        )
      }
    >
      {cart.length === 0 ? (
        <Empty description="Giỏ hàng trống" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cart}
          renderItem={item => (
            <List.Item
              actions={[
                <InputNumber
                  min={1}
                  max={99}
                  value={item.quantity}
                  onChange={val => updateQuantity(item.id, val)}
                  size="small"
                />,
                <Popconfirm title="Xóa sản phẩm này?" onConfirm={() => removeFromCart(item.id)} okText="Xóa" cancelText="Hủy">
                  <Button danger size="small">Xóa</Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={<img src={item.image || '/favicon.ico'} alt={item.name} className="w-12 h-12 object-cover rounded" />}
                title={<Text strong>{item.name}</Text>}
                description={<span className="text-green-600 font-semibold">{item.price}</span>}
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default CartDrawer; 