import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartSidebar from './CartSidebar'; // Import your CartSidebar

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Access setIsCartOpen from useCart context
  const { setIsCartOpen } = useCart(); 

  return (
    <nav className="bg-white py-4 px-4 md:py-8 md:px-16">
      <div className="flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-bold text-[#B88E2F]">Furniro</div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-8">
          <Link to="/" className="text-black hover:text-[#B88E2F]">Home</Link>
          <Link to="/shop" className="text-black hover:text-[#B88E2F]">Shop</Link>
          <Link to="/admin" className="text-black hover:text-[#B88E2F]">admin</Link>
          <Link to="/" className="text-black hover:text-[#B88E2F]">About</Link>
          <Link to="/" className="text-black hover:text-[#B88E2F]">Contact</Link>
        </div>
        
        {/* Icons */}
        <div className="hidden md:flex space-x-4 lg:space-x-6">
          <User className="text-black hover:text-[#B88E2F] cursor-pointer" size={24} />
          <Search className="text-black hover:text-[#B88E2F] cursor-pointer" size={24} />
          <Heart className="text-black hover:text-[#B88E2F] cursor-pointer" size={24} />
          
          {/* Cart Icon to open CartSidebar */}
          <button
            className="text-black hover:text-[#B88E2F] cursor-pointer"
            onClick={() => setIsCartOpen(true)} // Open cart sidebar on click
          >
            <ShoppingCart size={24} />
          </button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-black" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4">
          <Link to="/" className="text-black hover:text-[#B88E2F]">Home</Link>
          <Link to="/shop" className="text-black hover:text-[#B88E2F]">Shop</Link>
          <Link to="/about" className="text-black hover:text-[#B88E2F]">About</Link>
          <Link to="/contact" className="text-black hover:text-[#B88E2F]">Contact</Link>
          <div className="flex space-x-4 mt-4">
            <User className="text-black hover:text-[#B88E2F] cursor-pointer" size={24} />
            <Search className="text-black hover:text-[#B88E2F] cursor-pointer" size={24} />
            <Heart className="text-black hover:text-[#B88E2F] cursor-pointer" size={24} />
            <button
              className="text-black hover:text-[#B88E2F] cursor-pointer"
              onClick={() => setIsCartOpen(true)} // Open cart sidebar on click
            >
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>
      )}
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </nav>
  );
}
