import React, { useState } from 'react';
import { useSales } from '../contexts/SalesContext';
import { productsArray } from './EnhancedProductGridWithPagination';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentView, setCurrentView] = useState('login');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const { sales } = useSales();
  const [products, setProducts] = useState(productsArray);
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin') {
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: parseFloat(newProduct.price),
      originalPrice: parseFloat(newProduct.price),
      discount: 0,
      isNew: true
    };
    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    productsArray.push(productToAdd);
    setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
    alert('Product added successfully!');
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">Admin Panel</span>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <button onClick={() => setCurrentView('dashboard')} className={`${currentView === 'dashboard' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Dashboard
                </button>
                <button onClick={() => setCurrentView('addProduct')} className={`${currentView === 'addProduct' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Add Product
                </button>
                <button onClick={() => setCurrentView('salesHistory')} className={`${currentView === 'salesHistory' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Sales History
                </button>
                <button onClick={() => setCurrentView('productList')} className={`${currentView === 'productList' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Product List
                </button>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button onClick={handleLogout} className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'addProduct' && 'Add New Product'}
              {currentView === 'salesHistory' && 'Sales History'}
              {currentView === 'productList' && 'Product List'}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {currentView === 'dashboard' && (
              <div className="px-4 py-8 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <p className="text-2xl text-gray-500">Welcome to the Admin Dashboard</p>
                </div>
              </div>
            )}
            {currentView === 'addProduct' && (
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleAddProduct}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={newProduct.name}
                          onChange={handleProductInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={newProduct.description}
                          onChange={handleProductInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={newProduct.price}
                          onChange={handleProductInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                          Image URL
                        </label>
                        <input
                          type="text"
                          name="imageUrl"
                          id="imageUrl"
                          value={newProduct.imageUrl}
                          onChange={handleProductInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {currentView === 'salesHistory' && (
              <div className="flex flex-col mt-8">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Address
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Products
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sales.map((sale) => (
                            <tr key={sale.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.customerName}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.address}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {sale.products.map(product => `${product.name} (${product.quantity})`).join(', ')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {sale.total.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(sale.date).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentView === 'productList' && (
              <div className="flex flex-col mt-8">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full  divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Discount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {products.map((product) => (
                            <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {product.price}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.discount}%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.isNew ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    New
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                    Regular
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}