import './checkout-item.styles.scss'
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";
import {useDispatch, useSelector} from "react-redux";
import {addCartItems, clearCartItem, removeCartItems} from "../../store/cart/cart.action";
// import {CartContext} from "../../contexts/cart.context";
// import {useContext} from "react";

const CheckoutItem = ({cartItem}) => {
    const  dispatch = useDispatch();
    // const {addCartItems, removeCartItems, clearCartItem} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const {name, imageUrl, price, quantity} = cartItem;
    const removeItemHandler = () => {
        // removeCartItems(cartItem);
        dispatch(removeCartItems(cartItems,cartItem));
    };
    const addItemHandler = () => {
        dispatch(addCartItems(cartItems,cartItem));
    };
    const clearItemHandler = () => {
        dispatch(clearCartItem(cartItems,cartItem));
    };
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'> {price}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    );
};
export default CheckoutItem;