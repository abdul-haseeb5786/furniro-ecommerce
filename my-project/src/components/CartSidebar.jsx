import React from "react";
import { useCart } from "../contexts/CartContext";
import { X } from "lucide-react";
import { Link } from 'react-router-dom';

// Rest of your CartSidebar component code...


const CartSidebar = () => {
  const { cartItems, removeFromCart, getCartTotal, isCartOpen, setIsCartOpen } = useCart(); // Access context

  if (!isCartOpen) return null; // Cart will only show when isCartOpen is true

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        ></div>
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-6 flex">
                      <li key={item.quantity} className="py-6 flex">
                        <div className="w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <h3 className="text-gray-900">{item.name}</h3>
                          <p className="ml-4">Rs. {item.price.toLocaleString()}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>Rs. {getCartTotal().toLocaleString()}</p>
                </div>
                <Link to="/checkout">
                <button
                  className="bg-yellow-500 text-white py-2 px-4"
                  onClick={() => alert('Proceed to checkout!')}
                >
                  Checkout
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartSidebar;
