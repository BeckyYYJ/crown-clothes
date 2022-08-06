import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
// import {CartContext} from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../store/cart/cart.selector";
import {useSelector} from "react-redux";

const CartDropdown = () => {
    const navigate = useNavigate();
    const goToCheckoutHandler = ()=>{
      navigate('/checkout');
    };
    const cartItems = useSelector(selectCartItems);
    // const {cartItems} = useContext(CartContext);
    return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
        {cartItems.map((item)=>(
            <CartItem key={item.id} cartItem={item}/>
        ))}
        </div>
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
);};

export default CartDropdown;