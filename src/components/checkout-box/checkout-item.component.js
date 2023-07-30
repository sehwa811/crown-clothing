import React, { useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";


import './checkout-item.styles.scss'

const CheckoutBox = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
    
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  const totalPrice = quantity * price;

  return (
    <div className="checkout-item-container">
      <div className='image-container'>
        <img src={imageUrl} />
      </div>
      <span className='name'>{name}</span>

      <div className="quantities">
        <span className='arrow' onClick={removeItemHandler}>&#10094;</span>
        <span>{quantity}</span>
        <span className='arrow' onClick={addItemHandler}>&#10095;</span>
      </div>

      <span className='price'>{totalPrice}</span>
      <div className='remove-div' onClick={clearItemHandler} >&#10005;</div>
    </div>
  );
};

export default CheckoutBox;
