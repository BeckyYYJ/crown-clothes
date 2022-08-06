import {createContext, useEffect, useReducer, useState} from 'react';

const addCartItemHelper = (cartItems, product) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === product.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === product.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    }
    return [...cartItems, {...product, quantity: 1}]
};
const removeCartItemHelper = (cartItems, removeItem) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === removeItem.id
    );
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((c) => c.id !== removeItem.id);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === removeItem.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    );
};
const clearCartItemHelper = (cartItems, item) => {
    // const existingCartItem = cartItems.find(
    //     (cartItem) => cartItem.id === item.id
    // );
    // if(existingCartItem.quantity===1){
    return cartItems.filter((c) => c.id !== item.id);
    // }
    // return []
};
export const CartContext = createContext({
    cartItems: [],
    addCartItems: () => {
    },
    cartCount: 0,
    removeCartItems: () => {
    },
    clearCartItem: () => {
    },
    cartTotal: 0,
});
const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
};
const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
};
const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
    }
};
export const CartProvider = ({children}) => {
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal,setCartTotal] = useState(0);
    const [{cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    // const addCartItems = (product) => {
    //     setCartItems(addCartItemHelper(cartItems, product));
    // };
    // const removeCartItems = (product) => {
    //     //     setCartItems(removeCartItemHelper(cartItems, product));
    //     // };
    // const clearCartItem = (product) => {
    //     setCartItems(clearCartItemHelper(cartItems, product));
    // };
    // useEffect(() => {
    //         const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //         setCartCount(newCartCount)
    //     }
    //     , [cartItems]);
    // useEffect(() => {
    //         const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.price*cartItem.quantity, 0);
    //         setCartTotal(newCartCount)
    //     }
    //     , [cartItems]);
    const addCartItems = (product) => {
        updateToReducer(addCartItemHelper(cartItems, product));
    };

    const removeCartItems = (product) => {
        updateToReducer(removeCartItemHelper(cartItems, product));
    };
    const clearCartItem = (product) => {
        updateToReducer(clearCartItemHelper(cartItems, product));
    };
    const updateToReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {
                cartCount: newCartCount,
                cartItems: newCartItems,
                cartTotal: newCartTotal
            }
        })
    };

    const value = {cartItems, addCartItems, cartCount, removeCartItems, clearCartItem, cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};