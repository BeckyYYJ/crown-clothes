import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../Categories-preview/Categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {setCategories} from "../../store/categories/categories.action";
import {useDispatch} from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCM = async () => {
            const categories = await getCategoriesAndDocuments();
            dispatch(setCategories(categories));
        };
        getCM();
    }, []);
    return (
        <>
            <Routes>
                <Route element={<CategoriesPreview/>} index/>
                <Route path=':category' element={<Category/>}/>
            </Routes>
        </>)
};
export default Shop;