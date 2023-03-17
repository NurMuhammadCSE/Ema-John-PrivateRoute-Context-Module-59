import React, { useState } from "react";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import Button from 'react-bootstrap/Button';

const Orders = () => {
  const { products, previousCart } = useLoaderData();
  const [cart, setCart] = useState(previousCart);

  const navigate = useNavigate();
  const handleRemoveProduct = (product) => {
    const rest = cart.filter((pd) => pd.id !== product.id);
    setCart(rest);
    removeFromDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="review-items-container">
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveProduct={handleRemoveProduct}
          ></ReviewItem>
        ))}
        {
            cart.length === 0 && <h2>No Items Found. Please <Link to={'/'}>Shop more</Link></h2>
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Button variant="danger" onClick={() => navigate("/inventory")}>
            Proceed Checkout{" "}
          </Button>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
