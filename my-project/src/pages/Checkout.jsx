import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useSales } from '../contexts/SalesContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addSale } = useSales();
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    town: '',
    province: '',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Order Receipt', 105, 15, null, null, 'center');
    
    doc.setFontSize(12);
    doc.text(`Name: ${billingDetails.firstName} ${billingDetails.lastName}`, 20, 30);
    doc.text(`Email: ${billingDetails.email}`, 20, 40);
    doc.text(`Phone: ${billingDetails.phone}`, 20, 50);
    doc.text(`Address: ${billingDetails.streetAddress}, ${billingDetails.town}, ${billingDetails.province} ${billingDetails.zipCode}`, 20, 60);

    const tableColumn = ["Product", "Quantity", "Price", "Total"];
    const tableRows = cartItems.map(item => [
      item.name,
      item.quantity,
      `Rs. ${item.price.toFixed(2)}`,
      `Rs. ${(item.price * item.quantity).toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 70,
      head: [tableColumn],
      body: tableRows,
    });

    const finalY = doc.lastAutoTable.finalY || 70;
    doc.text(`Total: Rs. ${getCartTotal().toFixed(2)}`, 20, finalY + 10);

    doc.save("order_receipt.pdf");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();

    const newSale = {
      id: Date.now(),
      customerName: `${billingDetails.firstName} ${billingDetails.lastName}`,
      address: `${billingDetails.streetAddress}, ${billingDetails.town}, ${billingDetails.province} ${billingDetails.zipCode}`,
      products: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: getCartTotal(),
      date: new Date().toISOString()
    };

    addSale(newSale);
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Billing details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={billingDetails.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name (Optional)</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={billingDetails.companyName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region <span className="text-red-500">*</span></label>
              <select
                id="country"
                name="country"
                value={billingDetails.country}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
              </select>
            </div>
            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street address <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={billingDetails.streetAddress}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="town" className="block text-sm font-medium text-gray-700">Town / City <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="town"
                name="town"
                value={billingDetails.town}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province <span className="text-red-500">*</span></label>
              <select
                id="province"
                name="province"
                value={billingDetails.province}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a province</option>
                <option value="Western Province">Western Province</option>
                <option value="Central Province">Central Province</option>
                <option value="Southern Province">Southern Province</option>
              </select>
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP code <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={billingDetails.zipCode}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={billingDetails.phone}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows="3"
                value={billingDetails.additionalInfo}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Notes about your order, e.g. special notes for delivery."
              ></textarea>
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your order</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between font-semibold mb-4 pb-2 border-b">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>Rs. {getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input type="radio" id="directBankTransfer" name="paymentMethod" className="mr-2" />
                <label htmlFor="directBankTransfer" className="text-sm">Direct Bank Transfer</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="cashOnDelivery" name="paymentMethod" className="mr-2" />
                <label htmlFor="cashOnDelivery" className="text-sm">Cash On Delivery</label>
              </div>
            </div>
            <p className="text-sm mt-4">
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
            </p>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full mt-6 bg-yellow-400 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-gray-900 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}