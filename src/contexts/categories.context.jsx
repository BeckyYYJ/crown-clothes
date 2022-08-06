import {createContext, useState,useEffect} from 'react';
// import data from '../shop-data.js';
import {addCollectionAndDocuments, getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap:{},
    setCategoriesMap:()=>{}
});
export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({});
    useEffect(()=>{
        const getCM = async ()=>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };
        getCM();
    },[]);

    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',data);
    // },[]);

    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
};