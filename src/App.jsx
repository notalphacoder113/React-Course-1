import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

    useEffect(() => {
        // request for cart data from backend
        axios.get('/api/cart-items')
            .then((response) => {
                console.log(response.data); // update the cart
                setCart(response.data); // update the cart
            });
    });

  return (
    <Routes>
    <Route index element={<HomePage cart={cart} />} />
    <Route path='checkout' element={<CheckoutPage cart={cart} />} />
    <Route path='orders' element={<OrdersPage />} />
    </Routes>
  )
}

export default App
