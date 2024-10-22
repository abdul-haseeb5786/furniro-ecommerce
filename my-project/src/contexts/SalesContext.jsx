// src/contexts/SalesContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const SalesContext = createContext();

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
};

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState(() => {
    const localData = localStorage.getItem('sales');
    return localData ? JSON.parse(localData) : [];
  });

  const addSale = (sale) => {
    setSales(prevSales => {
      const newSales = [...prevSales, sale];
      localStorage.setItem('sales', JSON.stringify(newSales));
      return newSales;
    });
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};