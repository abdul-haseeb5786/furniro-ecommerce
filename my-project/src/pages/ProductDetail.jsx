import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Star, ChevronRight } from 'lucide-react';
import { productsArray } from '../components/EnhancedProductGridWithPagination';
import ComparisonDropdown from './ComparisonPage'; // Updated import statement

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('xl');
  const [selectedColor, setSelectedColor] = useState('purple');
  const [showComparisonDropdown, setShowComparisonDropdown] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundProduct = productsArray.find((p) => p.id === parseInt(id, 10));
      if (foundProduct) {
        setProduct({
          ...foundProduct,
          rating: 4,
          reviewCount: 5,
          sizes: ['l', 'xl', 'xxl'],
          colors: ['purple', 'black', 'gold'],
          images: [foundProduct.imageUrl, '/placeholder.svg?height=500&width=500', '/placeholder.svg?height=500&width=500', '/placeholder.svg?height=500&width=500'],
          sku: 'SS001',
          category: 'Sofas',
          tags: ['Sofa', 'Chair', 'Home', 'Shop']
        });
        setMainImage(foundProduct.imageUrl);
      }
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.imageUrl
    });
  };

  const handleCompare = () => {
    const comparisonList = JSON.parse(localStorage.getItem('comparisonList') || '[]');
    
    if (comparisonList.length < 3 && !comparisonList.includes(product.id)) {
      comparisonList.push(product.id);
      localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
      setShowComparisonDropdown(true);
      navigate('/comparison'); // Navigate to the comparison page
    } else if (comparisonList.includes(product.id)) {
      alert("This product is already in your comparison list.");
    } else {
      alert("You can compare up to 3 products at a time.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/shop" className="hover:underline">Shop</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img src={mainImage} alt={product.name} className="w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${product.name} ${index + 1}`} 
                className="w-full rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-[#B88E2F] mb-4">Rs. {product.price.toLocaleString()}</p>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-5 h-5 ${star <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-sm text-gray-500">{product.reviewCount} Customer Review</span>
          </div>
          <p className="mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex space-x-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 rounded-full ${selectedSize === size ? 'bg-[#B88E2F] text-white' : 'bg-gray-200'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex space-x-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#B88E2F]' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button className="px-3 py-1" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="px-4">{quantity}</span>
              <button className="px-3 py-1" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button 
              className="bg-[#B88E2F] text-white px-6 py-2 rounded hover:bg-[#A17922] transition-colors"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
            <button 
              className="border border-[#B88E2F] text-[#B88E2F] px-6 py-2 rounded hover:bg-[#B88E2F] hover:text-white transition-colors"
              onClick={handleCompare}
            >
              + Compare
            </button>
          </div>

          <div className="border-t pt-4 text-sm">
            <p><span className="font-semibold">SKU:</span> {product.sku}</p>
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Tags:</span> {product.tags.join(', ')}</p>
            <div className="flex items-center mt-2">
              <span className="font-semibold mr-2">Share:</span>
              <a href="#" className="mr-2">
                <img src="/placeholder.svg?height=24&width=24&text=F" alt="Facebook" width={24} height={24} />
              </a>
              <a href="#" className="mr-2">
                <img src="/placeholder.svg?height=24&width=24&text=L" alt="LinkedIn" width={24} height={24} />
              </a>
              <a href="#">
                <img src="/placeholder.svg?height=24&width=24&text=T" alt="Twitter" width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex border-b">
          <button className="py-2 px-4 border-b-2 border-[#B88E2F] text-[#B88E2F]">Description</button>
          <button className="py-2 px-4">Additional Information</button>
          <button className="py-2 px-4">Reviews [{product.reviewCount}]</button>
        </div>
        <div className="mt-4">
          <p>{product.description}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {productsArray.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
            <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <Link to={`/product/${relatedProduct.id}`}>
                <img src={relatedProduct.imageUrl} alt={relatedProduct.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold">{relatedProduct.name}</h3>
                  <p className="text-gray-600 text-sm">{relatedProduct.description.slice(0, 50)}...</p>
                  <p className="mt-2 font-semibold text-[#B88E2F]">Rp {relatedProduct.price.toLocaleString()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="border border-[#B88E2F] text-[#B88E2F] px-6 py-2 rounded hover:bg-[#B88E2F] hover:text-white transition-colors">Show More</button>
        </div>
      </div>
      {showComparisonDropdown && (
        <ComparisonDropdown
          onClose={() => setShowComparisonDropdown(false)}
          currentProductId={product.id}
        />
      )}
    </div>
  );
}