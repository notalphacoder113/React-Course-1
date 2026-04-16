import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';


export function HomePage({ cart }) {
    // update the data 
    const [products, setProducts] = useState([]);

    // fetch the product data from backend instead of feact('url');
    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data); // updater function of useState()
            })
    }, []); // dependency array = helps us to control useEffect() ,here runs only once

    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products}/>
            </div>
        </>
    );
}