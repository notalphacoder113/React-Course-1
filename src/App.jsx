import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // request for cart data from backend
    axios.get('/api/cart-items?expand=product') // Query paramete = let us add additional info to our request
      .then((response) => {
        console.log(response.data); // update the cart
        setCart(response.data); // update the cart
      });
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
