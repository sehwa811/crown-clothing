import React, { useContext } from "react";

import { CartContext } from "../../contexts/cart-context";

import './checkout-item.styles.scss'

const CheckoutBox = ({ item }) => {
  const { addItemToCart, removeItemToCart, clearItemFromcart } = useContext(CartContext);
  const totalPrice = item.quantity * item.price;

  return (
    <div className="checkout-item-container">
      <div className='image-container'>
        <img src={item.imageUrl} />
      </div>
      <span className='name'>{item.name}</span>

      <div className="quantities">
        <span className='arrow' onClick={()=> removeItemToCart(item)}>&#10094;</span>
        <span>{item.quantity}</span>
        <span className='arrow' onClick={()=> addItemToCart(item)}>&#10095;</span>
      </div>

      <span className='price'>{totalPrice}</span>
      <div className='remove-div' onClick={() => clearItemFromcart(item)} >&#10005;</div>
    </div>
  );
};

export default CheckoutBox;
