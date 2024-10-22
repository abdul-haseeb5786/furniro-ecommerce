  'use client'

  import React, { useState, useEffect } from 'react';
  import { Sliders, Grid, List, ShoppingCart } from 'lucide-react';
  import { Button } from "./Button";
  import { Link } from 'react-router-dom'; // Import Link for routing
  import { useCart } from '../contexts/CartContext';

  const products = [
    {
      id: 1,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: 2500,
      originalPrice: 3500,
      discount: 30,
      imageUrl: "https://s3-alpha-sig.figma.com/img/2084/99f3/7c62fb49f7d4a1a6a5dc5959b40150ed?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BvZ1pS8MvRL8RbQiryxFxi-AoUn7BhmvJnZAhG~97SIB9pXivR8XdyPu8ZqG5iagz2JJQJO0DXVPNPKyczYiU6bKrift80vFDraZJvpm7pmWRfXZ3gzY94~gwckPqnDDEAfRHJ~v1n~3tvXTEhN8aF0kVBVkRCHcoHGBdKkyKhfKXUDKAiy2IAyFNB~vRXfbftPLFCiWLCp4fHfZrA0H7~WL64-5UuUsPk1wzoj1iNtlr9~cpyrhDs4HIQ~gycivBnha~dzbR0-W5MP8iidHmQNuhH0bbFppoayMXCmOK~7qRyDUeVgL8VCzHj3L0f~n~VoL7Wv39WO6D~-LLQgicQ__",
      isNew: false,
    },
    {
      id: 2,
      name: "Leviosa",
      description: "Stylish cafe chair",
      price: 2500,
      originalPrice: 2500,
      discount: 0,
      imageUrl: "url_to_image_2.jpg",
      isNew: false,
    },
    {
      id: 3,
      name: "Lolito",
      description: "Luxury big sofa",
      price: 7000,
      originalPrice: 14000,
      discount: 50,
      imageUrl: "url_to_image_3.jpg",
      isNew: false,
    },
    {
      id: 4,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 5000,
      originalPrice: 5000,
      discount: 50,
      imageUrl: "url_to_image_4.jpg",
      isNew: true,
    },
    {
      id: 5,
      name: "Grava",
      description: "Wooden dining table",
      price: 5500,
      originalPrice: 7500,
      discount: 25,
      imageUrl: "url_to_image_5.jpg",
      isNew: false,
    },
    {
      id: 6,
      name: "Friska",
      description: "Comfortable recliner chair",
      price: 3500,
      originalPrice: 4500,
      discount: 20,
      imageUrl: "url_to_image_6.jpg",
      isNew: true,
    },
    {
      id: 7,
      name: "Nolis",
      description: "Modern study desk",
      price: 1500,
      originalPrice: 2000,
      discount: 10,
      imageUrl: "url_to_image_7.jpg",
      isNew: false,
    },
    {
      id: 8,
      name: "Xylos",
      description: "Wooden cabinet",
      price: 4500,
      originalPrice: 5500,
      discount: 15,
      imageUrl: "url_to_image_8.jpg",
      isNew: false,
    },
    {
      id: 9,
      name: "Frestro",
      description: "Glass coffee table",
      price: 2500,
      originalPrice: 3500,
      discount: 30,
      imageUrl: "url_to_image_9.jpg",
      isNew: false,
    },
    {
      id: 10,
      name: "Quillo",
      description: "Leather armchair",
      price: 6500,
      originalPrice: 8000,
      discount: 20,
      imageUrl: "url_to_image_10.jpg",
      isNew: true,
    },
    {
      id: 11,
      name: "Selara",
      description: "Outdoor lounge chair",
      price: 4000,
      originalPrice: 5000,
      discount: 10,
      imageUrl: "url_to_image_11.jpg",
      isNew: false,
    },
    {
      id: 12,
      name: "Moderne",
      description: "Sleek office chair",
      price: 3200,
      originalPrice: 4000,
      discount: 20,
      imageUrl: "url_to_image_12.jpg",
      isNew: false,
    },
    {
      id: 13,
      name: "Venturo",
      description: "Elegant bookshelf",
      price: 7000,
      originalPrice: 9000,
      discount: 15,
      imageUrl: "url_to_image_13.jpg",
      isNew: false,
    },
    {
      id: 14,
      name: "Aristo",
      description: "Leather executive chair",
      price: 8000,
      originalPrice: 10000,
      discount: 20,
      imageUrl: "url_to_image_14.jpg",
      isNew: true,
    },
    {
      id: 15,
      name: "Nordic",
      description: "Minimalist dining table",
      price: 5500,
      originalPrice: 6500,
      discount: 15,
      imageUrl: "url_to_image_15.jpg",
      isNew: false,
    },
    {
      id: 16,
      name: "Lumos",
      description: "Stylish floor lamp",
      price: 1500,
      originalPrice: 2500,
      discount: 40,
      imageUrl: "url_to_image_16.jpg",
      isNew: true,
    }
  ];  
  export const productsArray = products;

export default function EnhancedProductGridWithPagination() {
  const { addToCart } = useCart(); // Get addToCart function from cart context
  const [sortBy, setSortBy] = useState('Default');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const productsPerPage = 8;

  useEffect(() => {
    let sortedProducts = [...products];
    switch (sortBy) {
      case 'PriceLowHigh':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'PriceHighLow':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Discount':
        sortedProducts.sort((a, b) => b.discount - a.discount);
        break;
      default:
        sortedProducts.sort((a, b) => a.id - b.id);
        break;
    }
    setDisplayedProducts(sortedProducts);
    setCurrentPage(1);
  }, [sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // Default quantity can be 1
      image: product.imageUrl,
    });
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header section */}
      <div className="flex flex-wrap justify-between items-start sm:items-center py-4 px-6 bg-[#f9f4ed] mb-6 space-y-4 sm:space-y-0 w-full">
        {/* Filter and View Mode Icons */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5" />
            <span className="font-medium">Filter</span>
          </div>
          <div className="flex space-x-2">
            <Grid 
              className={`w-5 h-5 cursor-pointer ${viewMode === 'grid' ? 'text-primary' : ''}`} 
              onClick={() => setViewMode('grid')}
            />
            <List 
              className={`w-5 h-5 cursor-pointer ${viewMode === 'list' ? 'text-primary' : ''}`} 
              onClick={() => setViewMode('list')}
            />
          </div>
        </div>
        
        {/* Results Count */}
        <div className="w-full sm:w-auto">
          <span className="text-gray-500">Showing {currentProducts.length} of {displayedProducts.length} results</span>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <span>Sort by</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className="border border-gray-300 bg-white px-2 py-1 rounded-md w-full sm:w-auto"
          >
            <option value="Default">Default</option>
            <option value="PriceLowHigh">Price: Low to High</option>
            <option value="PriceHighLow">Price: High to Low</option>
            <option value="Discount">Discount</option>
          </select>
        </div>
      </div>

      {/* Product grid or list */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"}>
        {currentProducts.map((product) => (
          <div key={product.id} className={`group ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
            <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'mb-3'}`}>
              <Link to={`/product/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-cover" />
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    variant="secondary" 
                    className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 text-xs sm:text-sm"
                    onClick={() => handleAddToCart(product)} // Add click handler
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to cart
                  </Button>
                </div>
              </Link>
            </div>
            <div className={viewMode === 'list' ? 'w-2/3' : ''}>
              <h3 className="font-semibold text-base sm:text-lg">{product.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{product.description}</p>
              <div className="mt-2">
                <span className="font-bold text-sm sm:text-base">Rs {product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="ml-2 text-xs sm:text-sm text-gray-500 line-through">Rp {product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button 
                  onClick={() => paginate(index + 1)} 
                  className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-[#B88E2F] text-white' : 'bg-white text-black'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

