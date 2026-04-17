import axios from 'axios';
import { useState, useEffect } from 'react';
import { OrderSummery } from './OrderSummery';
import { CheckoutHeader } from './CheckoutHeader';
import { PaymentSummery } from './PaymentSummery';
import './CheckoutPage.css';
import './checkout-header.css';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]); // for devlivery option
    const [paymentSummery, setPaymentSummery] = useState(null); // for payment summery

    // axios : fetch the product data from backend instead of feact('url');
    // inside useEffect we have to make a new function to use async await , 
    // because the inner function of useEffect cannot return a promise .
    useEffect(() => {
        const fetchCheckoutData = async () => {
            // request for delivery options
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);

            // request for payment summary
            response = await axios.get('/api/payment-summary');
            setPaymentSummery(response.data);
        };

        fetchCheckoutData(); // call the async function
    }, [cart]);


    return (
        <>
            <title>Checkout</title>
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummery deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />
                    <PaymentSummery paymentSummery={paymentSummery} />
                </div>
            </div>
        </>

    );
}