import { useNavigate } from 'react-router-dom'

import { useSelector } from "react-redux";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../store/cart/cart.selector";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems)
  const navigate = useNavigate();

  const gotoCheckOut = () => {
    navigate('/checkout')
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={gotoCheckOut}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
