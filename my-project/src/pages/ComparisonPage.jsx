import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { productsArray } from '../components/EnhancedProductGridWithPagination';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function ComparisonPage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // For controlling dropdown
  const { addToCart } = useCart();
  

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.imageUrl
    });
  };

  useEffect(() => {
    const comparisonList = JSON.parse(localStorage.getItem('comparisonList') || '[]');
    setSelectedProducts(comparisonList);
  }, []);

  const handleProductSelect = (productId) => {
    if (selectedProducts.length < 3 && !selectedProducts.includes(productId)) {
      const newSelectedProducts = [...selectedProducts, productId];
      setSelectedProducts(newSelectedProducts);
      localStorage.setItem('comparisonList', JSON.stringify(newSelectedProducts));
      setShowDropdown(false); // Close dropdown after selecting product
    }
  };

  const handleRemoveProduct = (productId) => {
    const newSelectedProducts = selectedProducts.filter(id => id !== productId);
    setSelectedProducts(newSelectedProducts);
    localStorage.setItem('comparisonList', JSON.stringify(newSelectedProducts));
  };


  const renderStarRating = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
        ))}
      </div>
    );
  };

  return (
    
    <div>
      <div className="relative h-[400px] w-full overflow-hidden bg-[#f5f5f5]">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://s3-alpha-sig.figma.com/img/1461/f3d6/ff74c027a1888544144abe4be6e02cbf?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DQMhw0k4Pb~8vFctwXPdJBMlP0ko5OoXuEQWDgNCyd3z7PUTHRbsjHXAvda1RNGPeL4ZxZNM7eAl~K~pHR7B50ym5aauiU2O9ssFYAooheo8xmEtYuDbxaV0RdTB5C5ZcWzjAnaEomyKTaDSBiVKoRRJaKlZWDzdwOr-fY221Ji6hW0llm5uMRnoN5ajMeAtVj~qwBR0rr5sfyg5TCpA2fJr-HoKY1mTF1DJkaFrBKnaRo9oPMZ50lXInu7aZ6Rufp6mFgV4AW1LTzkmkXBLmO6jtBDLrQyt1hqiI6v~KIcWcH8gQjk0BUIF4L~lzt-iFhD4g0RzAdrSSGJT-sf3dg__')",
            backgroundPosition: "center"
          }}
        />
        
        {/* Semi-transparent overlay to reduce background opacity */}
        <div className="absolute inset-0 bg-white bg-opacity-50" />
        
        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-center items-center">
          {/* Shop title and breadcrumb */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">Comparison</h1>
            <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-black transition-colors font-bold">Home</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black font-normal">Comparison</span>
            </nav>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-7xl"></div>
      {/* Selected Products */}
      <div className="flex space-x-6">
        {/* Left Section */}
        <div className="w-[300px] bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
          <p className="text-lg font-semibold">Go to Product page for more Products</p>
          <Link to="/shop" className="text-gray-600 hover:text-black mt-2 underline">View More</Link>
        </div>
       
        {/* Selected Products */}
        <div className="flex space-x-4">
          {selectedProducts.map(productId => {
            const product = productsArray.find(p => p.id === productId);
            return (
              <div key={product.id} className="relative w-[242px] bg-white p-4 rounded-lg shadow-md">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
                <h3 className="font-semibold text-lg mt-2">{product.name}</h3>
                <p className="text-gray-500">Rs. {product.price.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  {renderStarRating(product.rating)}
                  <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                <button
                  className="absolute right-2 top-2 text-red-500"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="w-[300px] flex flex-col justify-between bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">Add A Product</p>
          
          {/* Dropdown for Selecting Products */}
          <div className="relative mb-8">
            <button
              onClick={() => setShowDropdown(prev => !prev)} // Toggle dropdown
              className="w-full bg-[#B88E2F] text-white py-2 px-4 rounded-full mt-2"
            >
              Add Product
            </button>

            {showDropdown && (
              <div className="absolute z-10 w-full max-h-60 overflow-y-auto mt-1 bg-white border rounded-lg shadow-lg">
                {productsArray.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProductSelect(product.id)}
                  >
                    <div className="flex items-center">
                      <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded mr-3" />
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">Rs. {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    {selectedProducts.includes(product.id) && (
                      <span className="text-green-500">✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      {selectedProducts.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6 mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F9F1E7]">
                <th className="border border-gray-200 p-3 text-left font-semibold text-[#B88E2F]">Feature</th>
                {selectedProducts.map(productId => {
                  const product = productsArray.find(p => p.id === productId);
                  return (
                    <th key={product.id} className="border border-gray-200 p-3 text-left">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#B88E2F]">{product.name}</span>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-3 font-semibold">Price</td>
                {selectedProducts.map(productId => {
                  const product = productsArray.find(p => p.id === productId);
                  return (
                    <td key={product.id} className="border border-gray-200 p-3">
                      Rs. {product.price.toLocaleString()}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-200 p-3 font-semibold">Rating</td>
                {selectedProducts.map(productId => {
                  const product = productsArray.find(p => p.id === productId);
                  return (
                    <td key={product.id} className="border border-gray-200 p-3">
                      {renderStarRating(product.rating)}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-200 p-3 font-semibold">Reviews</td>
                {selectedProducts.map(productId => {
                  const product = productsArray.find(p => p.id === productId);
                  return (
                    <td key={product.id} className="border border-gray-200 p-3">
                      {product.reviews} reviews
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-200 p-3 font-semibold"></td>
                {selectedProducts.map(productId => {
                  return (
                    <td key={productId} className="border border-gray-200 p-3">
                       <button 
              className="bg-[#B88E2F] text-white px-6 py-2 rounded hover:bg-[#A17922] transition-colors"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
