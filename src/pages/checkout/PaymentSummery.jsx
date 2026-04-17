import axios from 'axios';
import { useNavigate } from 'react-router';
import { formatMoney } from "../../utils/money";

export function PaymentSummery({ paymentSummery, loadCart }) {
    
    // let navigate to pages in app
    const navigate = useNavigate();

    const createOrder = async()=>{
        // request : make a order 
        await axios.post('/api/orders');  
        await loadCart(); // reload the cart to empty
        navigate("/orders"); // navigate to orders page
    }

    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            {paymentSummery && (
                <>
                    <div className="payment-summary-row">
                        <div>Items ({paymentSummery.totalItems}):</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummery.productCostCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummery.shippingCostCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummery.totalCostBeforeTaxCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummery.taxCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummery.totalCostCents)}
                        </div>
                    </div>

                    <button className="place-order-button button-primary" 
                    onClick={createOrder}>
                        Place your order
                    </button>
                </>
            )}
        </div>
    );
}