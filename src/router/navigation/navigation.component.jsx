import {Outlet, Link} from 'react-router-dom'
import {Fragment, useContext, useState} from 'react'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
// import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import {useSelector} from 'react-redux';

const Navigation = () => {
    const user = useSelector((state => state.user.currentUser));
    const [cartState,setCartState] = useState(false);
    // const {user} = useContext(UserContext);
    const signOutHandler = async ()=>{
        await signOutUser();
    };
    const dropdownHandler = ()=>{
        setCartState(!cartState);
    };

    return (
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' to='/'>
                    <CrwnLogo/>
                </Link>
                <div className='nav-links-container'>

                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    { user ? (
                        <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon onclick={dropdownHandler}/>
                </div>
                {cartState &&<CartDropdown/>}
            </div>
            <Outlet/>
        </Fragment>//替代必须有的父div，但不render任何div,没有fragment
    )
};
export default Navigation;