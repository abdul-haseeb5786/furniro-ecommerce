import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="mb-4">Your order has been successfully placed and a receipt has been generated.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">Return to Home</Link>
    </div>
  );
}