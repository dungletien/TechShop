import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Promotion from './pages/Promotion';
import News from './pages/News';
import ContactPage from './pages/ContactPage';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './admin/Admin';
import { categories } from './constants/categories';
import { bestSellers, newProducts } from './constants/products';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Header 
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                cartCount={cartCount}
              />
              <Routes>
                <Route path="/" element={
                  <Home 
                    categories={categories}
                    bestSellers={bestSellers}
                    newProducts={newProducts}
                    addToCart={addToCart}
                  />
                } />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/promotion" element={<Promotion addToCart={addToCart} />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
              <Footer categories={categories} />
            </div>
          </CartProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;