import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import CheckoutBox from "../../components/checkout-box/checkout-item.component";

import './checkout.styles.scss'

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

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
          <CheckoutBox key={item.id} cartItem={item} />
        ))}
        <div className='total'>Total: ${cartTotal}</div>
    </div>
  );
};

export default CheckoutPage;
