import {CART_ACTION_TYPES} from "./cart.types";

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
    return cartItems.filter((c) => c.id !== item.id);
};

export const addCartItems = (cartItems, product) => {
    return updateToReducer(addCartItemHelper(cartItems, product));
};

export const removeCartItems = (cartItems, product) => {
    return updateToReducer(removeCartItemHelper(cartItems, product));
};
export const clearCartItem = (cartItems, product) => {
    return updateToReducer(clearCartItemHelper(cartItems, product));
};

export const updateToReducer = (newCartItems) => {
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    }
};