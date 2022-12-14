import './checkout.styles.scss'
// import {CartContext} from "../../contexts/cart.context";
// import {useContext} from "react";
import CheckoutItem from "../../component/checkout-item/checkout-item.component";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";

const Checkout = ()=>{
    // const {cartItems,cartTotal} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((cartItem)=>{
                    return (<CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
                })
            }
            <span className='total'>total:{cartTotal}</span>
        </div>
    )
};
export default Checkout;