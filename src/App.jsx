import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  // inside useEffect we have to make a new function to use async await , 
  // because the inner function of useEffect cannot return a promise .
  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get('/api/cart-items?expand=product'); // Query parameter = let us add additional info to our request
      setCart(response.data); // update the cart
    };

    fetchAppData(); // call the async function 
  });

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} />} />
      <Route path='orders' element={<OrdersPage cart={cart} />} />
    </Routes>
  )
}

export default App
