import React, { useContext } from "react";

import { CartContext } from "../../contexts/cart-context";
import CheckoutBox from "../../components/checkout-box/checkout-item.component";

import './checkout.styles.scss'

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
        {cartItems.map((item) => (
          <CheckoutBox key={item.id} item={item} />
        ))}
        <div className='total'>Total: ${cartTotal}</div>
    </div>
  );
};

export default CheckoutPage;
