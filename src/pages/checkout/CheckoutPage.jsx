import axios from 'axios';
import { useState, useEffect } from 'react';
import { OrderSummery } from './OrderSummery';
import { CheckoutHeader } from './CheckoutHeader';
import { PaymentSummery } from './PaymentSummery';
import './CheckoutPage.css';
import './checkout-header.css';

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]); // for devlivery option
    const [paymentSummery, setPaymentSummery] = useState(null); // for payment summery

    useEffect(() => {
        // request for delivery options
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOptions(response.data);
            });

        // request for payment summary
        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummery(response.data);
            });

    }, []);


    return (
        <>
            <title>Checkout</title>
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummery deliveryOptions={deliveryOptions} cart={cart}  />
                    <PaymentSummery paymentSummery={paymentSummery} />
                </div>
            </div>
        </>

    );
}