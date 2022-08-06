import './product-card.styles.scss'
import Button from '../button/button.component'
import {useDispatch, useSelector} from "react-redux";
import {addCartItems} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";
// import {CartContext} from "../../contexts/cart.context";
// import {useContext} from "react";

const ProductCard = ({product})=>{
    const dispatch = useDispatch();
    const {name,price,imageUrl} = product;
    // console.log(product);
    // const {addCartItems} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const add = ()=> dispatch(addCartItems(cartItems,product));
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={add}>Add to card</Button>
        </div>
    );
};
export default ProductCard;