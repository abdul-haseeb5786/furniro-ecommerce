import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from './contexts/CartContext';
import { SalesProvider } from './contexts/SalesContext';
import Shop from './pages/Shop';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ComparisonPage from './pages/ComparisonPage';
import Checkout from './pages/checkout';
import AdminPage from './components/AdminPage';
import OrderConfirmation from './components/OrderConfirmation';
import Navbar from './components/NavBar';

export default function App() {
  return (
    <SalesProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/comparison" element={<ComparisonPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
              </Routes>
            </main>
            <Footer />
            <CartSidebar />
          </div>
        </BrowserRouter>
      </CartProvider>
    </SalesProvider>
  );
}