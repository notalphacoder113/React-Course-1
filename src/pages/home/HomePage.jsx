import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';


export function HomePage({ cart , loadCart}) {
    // update the data 
    const [products, setProducts] = useState([]);

    // axios : fetch the product data from backend instead of feact('url');
    // inside useEffect we have to make a new function to use async await , 
    // because the inner function of useEffect cannot return a promise .
    useEffect(() => {
        // new function for using async await inside useEffect
        const getHomeData = async ()=> {
            const response = await axios.get('/api/products');
            setProducts(response.data); // updater function of useState()
        };

        getHomeData(); // call the async function
    }, []); // dependency array = helps us to control useEffect() ,here runs only once

    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}