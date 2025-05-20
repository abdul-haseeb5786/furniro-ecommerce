import React, { useState } from 'react';
import { Share2, BarChart2, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const products = [
  { id: 1, name: 'Syltherine', description: 'Stylish cafe chair', price: 2500000, oldPrice: 3500000, image: 'home/image 1.png', discount: 30 },
  { id: 2, name: 'Leviosa', description: 'Stylish cafe chair', price: 2500000, image: 'home/image 3.png' },
  { id: 3, name: 'Lolito', description: 'Luxury big sofa', price: 7000000, oldPrice: 14000000, image: 'home/image 7.png', discount: 50 },
  { id: 4, name: 'Respira', description: 'Outdoor bar table and stool', price: 500000, image: 'home/image 8.png', isNew: true },
  { id: 5, name: 'Grifo', description: 'Night lamp', price: 1500000, image: 'home/Images-1.png' },
  { id: 6, name: 'Muggo', description: 'Small mug', price: 150000, image: 'home/Images-2.png', isNew: true },
  { id: 7, name: 'Pingky', description: 'Cute bed set', price: 7000000, oldPrice: 14000000, image: 'home/Images.png', discount: 50 },
  { id: 8, name: 'Potty', description: 'Minimalist flower pot', price: 500000, image: 'home/Images (1).png', isNew: true },
  { id: 9, name: 'Syltherine', description: 'Stylish cafe chair', price: 2500000, oldPrice: 3500000, image: 'home/image 1.png', discount: 30 },
  { id: 10, name: 'Leviosa', description: 'Stylish cafe chair', price: 2500000, image: 'home/image 3.png' },
  { id: 11, name: 'Lolito', description: 'Luxury big sofa', price: 7000000, oldPrice: 14000000, image: 'home/image 7.png', discount: 50 },
  { id: 12, name: 'Respira', description: 'Outdoor bar table and stool', price: 500000, image: 'home/image 8.png', isNew: true },
  { id: 13, name: 'Grifo', description: 'Night lamp', price: 1500000, image: 'home/Images-1.png' },
  { id: 14, name: 'Muggo', description: 'Small mug', price: 150000, image: 'home/Images-2.png', isNew: true },
  { id: 15, name: 'Pingky', description: 'Cute bed set', price: 7000000, oldPrice: 14000000, image: 'home/Images.png', discount: 50 },
  { id: 16, name: 'Potty', description: 'Minimalist flower pot', price: 500000, image: 'home/Images (1).png', isNew: true },
  
];

export default function Component() {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { addToCart } = useCart();
  
  const showMore = () => {
    setVisibleProducts(prevVisible => Math.min(prevVisible + 8, products.length));
  };
    const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // Default quantity can be 1
      image: product.imageUrl,
    });
  };
  return React.createElement('div', { className: 'bg-white py-16 px-4 sm:px-6 lg:px-8' },
    React.createElement('div', { className: 'max-w-7xl mx-auto' },
      React.createElement('h2', { className: 'text-3xl font-bold text-gray-900 mb-8 text-center' }, 'Our Products'),
      React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' },
        products.slice(0, visibleProducts).map(product => 
          React.createElement('div', { key: product.id, className: 'bg-white rounded-lg overflow-hidden group relative' },
            React.createElement('div', { className: 'relative' },
              React.createElement('img', {
                src: product.image,
                alt: product.name,
                width: 400,
                height: 300,
                className: 'w-full h-[300px] object-cover'
              }),
              product.discount && React.createElement('div', { className: 'absolute top-4 left-4 bg-[#E97171] text-white px-3 py-1 rounded-full text-sm font-semibold' },
                `-${product.discount}%`
              ),
              product.isNew && React.createElement('div', { className: 'absolute top-4 right-4 bg-[#2EC1AC] text-white px-3 py-1 rounded-full text-sm font-semibold' },
                'New'
              ),
              React.createElement('div', { className: 'absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity' },
                React.createElement('button', {
                  className: 'bg-white text-gray-900 px-8 py-3 rounded-md font-bold mb-4 hover:bg-gray-100 transition-colors',
                  onClick: () => handleAddToCart(product), // Add onClick here
                }, 
                  'Add to cart'
                ),
                React.createElement('div', { className: 'flex space-x-4' },
                  React.createElement('button', { className: 'text-white hover:text-gray-200 transition-colors' },
                    React.createElement(Share2, { className: 'h-6 w-6' })
                  ),
                  React.createElement('button', { className: 'text-white hover:text-gray-200 transition-colors' },
                    React.createElement(BarChart2, { className: 'h-6 w-6' })
                  ),
                  React.createElement('button', { className: 'text-white hover:text-gray-200 transition-colors' },
                    React.createElement(Heart, { className: 'h-6 w-6' })
                  )
                )
              )
            ),
            React.createElement('div', { className: 'p-4' },
              React.createElement('h3', { className: 'text-2xl font-semibold text-gray-900 mb-2' }, product.name),
              React.createElement('p', { className: 'text-lg text-gray-500 mb-4' }, product.description),
              React.createElement('div', { className: 'flex items-center justify-between' },
                React.createElement('div', null,
                  React.createElement('span', { className: 'text-2xl font-bold text-gray-900' },
                    `Rs ${product.price.toLocaleString()}`
                  ),
                  product.oldPrice && React.createElement('span', { className: 'ml-2 text-lg text-gray-500 line-through' },
                    `Rs ${product.oldPrice.toLocaleString()}`
                  )
                )
              )
            )
          )
        )
      ),
      visibleProducts < products.length && React.createElement('div', { className: 'mt-12 text-center' },
        React.createElement('button', {
          onClick: showMore,
          className: 'border border-[#B88E2F] bg-[white] text-[#B88E2F] px-10 py-3 rounded-md text-xl font-bold  hover:bg-[#A47E2A] hover:text-[white] transition-colors'
        }, 'Show More')
      )
    )
  );
}