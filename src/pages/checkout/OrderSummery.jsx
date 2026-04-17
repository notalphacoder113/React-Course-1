import axios from "axios";
import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { formatMoney } from "../../utils/money";

export function OrderSummery({ deliveryOptions, cart, loadCart }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                });

                // request - delete product from the cart 
                const deleteCartItem = async()=>{
                    await axios.delete(`/api/cart-items/${cartItem.productId}`);
                    await loadCart(); // reload the cart 

                };
                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date:  {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM DD')}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    {formatMoney(cartItem.product.priceCents)}
                                </div>
                                <div className="product-quantity">
                                    <span>
                                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                    </span>
                                    <span className="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span className="delete-quantity-link link-primary" 
                                    onClick={deleteCartItem}>
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                        </div>
                    </div>
                );
            })}
        </div>

    );
}