import './cart-icon.styles.scss'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import {useSelector} from "react-redux";
import {selectCartCount} from "../../store/cart/cart.selector";
// import {useContext} from "react";
// import {CartContext} from "../../contexts/cart.context";
const CartIcon = ({onclick})=>{
    // const {cartCount} = useContext(CartContext);
    const cartCount = useSelector(selectCartCount);
    return (
        <div className='cart-icon-container' onClick={onclick}>
            <ShoppingIcon className='shopping-icon'/>
            <span className="item-count">{cartCount}</span>
        </div>
    )
};
export default CartIcon;