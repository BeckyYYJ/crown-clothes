import {Routes, Route, Outlet} from 'react-router-dom'
// import Categories from './component/directory/directory.component'
// import './App.css';
import Home from './router/home/home.component'
import Navigation from './router/navigation/navigation.component'
import Authentication from "./router/authentication/authentication.component";
import Shop from "./router/shop/shop.component";
import Checkout from "./router/checkout/checkout.component";
import CategoryPreview from "./component/category-preview/category-preview.component";
import Category from "./router/category/category.component";
import Categories from "./component/directory/directory.component";
import {useEffect} from "react";
import {
    createUserDocumentFromAuth,
    getCategoriesAndDocuments,
    OnAuthStateChangedListener
} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";
import {setCategoriesMap} from "./store/categories/categories.action";

function App() {
    //one dispatch,never change
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = OnAuthStateChangedListener((user) => {
            if (user)
                createUserDocumentFromAuth(user);
            dispatch(setCurrentUser(user))
        });
        return unsubscribe;
    }, []);
    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={<Categories/>}/>
                    <Route path='shop/*' element={<Shop/>}/>
                    <Route path='auth' element={<Authentication/>}/>
                    <Route path='checkout' element={<Checkout/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
