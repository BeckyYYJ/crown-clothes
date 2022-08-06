import {createContext, useState, useEffect, useReducer} from 'react';
import {OnAuthStateChangedListener} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    user:null,
    setUser:()=>{}
});

// export const USER_ACTION_TYPES = {
//     SET_CURRENT_USER: 'SET_CURRENT_USER',
// };

// const INITIAL_STATE = {
//     currentUser: null,
// };
//
// const userReducer = (state,action) =>{
//     const {type,payload} = action;
//     switch (type) {
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 currentUser: payload
//             };
//         default:
//             throw new Error(`unhandled type ${type} in userReducer`);
//     }
// };
export const UserProvider = ({children})=>{
    // const [{currentUser},dispatch] = useReducer(userReducer,INITIAL_STATE);
    // const setUser = (user)=>{
    //     dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user})
    // };
    const value = {currentUser,setUser};
    // useEffect(()=>{
    //     const unsubscribe = OnAuthStateChangedListener(
    //         (user) => setUser(user)
    //     );
    //     return unsubscribe;
    // },[]);
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
};