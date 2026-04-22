import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function Product({ product, loadCart }) {
    // now each product has separate state. which solved the state change of every product.
    const [quantity, setQuantity] = useState(1);

    // implementation : showing add to cart when button is clicked
    const [showAdded, setShowAdded] = useState(false);

    // function to add product into cart
    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity // shorthand property used here
        }); // create a data in backend
        await loadCart(); // update the cart page when new item added


        // Implemantation: showing 'added' when button clicked
        setShowAdded(true);
        setTimeout(() => {
            setShowAdded(false);
        }, 2500);

    }

    // function for selecting quantity of ordering a product
    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value);
        setQuantity(quantitySelected);
    }


    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    data-testid="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    data-testid="product-rating-stars-image"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="showAddedToCart">
                {showAdded && <p>Added to Cart ✅</p>}
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
            data-testid = "add-to-cart-button"
             onClick={addToCart}>
                Add to Cart
            </button>
        </div>
    );
}