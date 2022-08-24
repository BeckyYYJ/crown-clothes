// import { useContext} from 'react'
// import {CategoriesContext} from "../../contexts/categories.context";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategories, selectCategoriesMap} from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
    // const {categoriesMap} = useContext(CategoriesContext);
    // const categoriesMap = useSelector((state => state.categories.categoriesMap));
    const categoriesMap = useSelector(selectCategoriesMap);
    console.log(categoriesMap);
    return (
        <>
            {/*{Object.keys(categoriesMap).map((title) => {*/}
                {/*return (*/}
                    {/*<Fragment key={title}>*/}
                        {/*<h2>{title}</h2>*/}
                        {/*<div className="products-container">*/}
                            {/*{categoriesMap[title].map((product) => {*/}
                                {/*return (<ProductCard key={product.id} product={product}/>)*/}
                            {/*})}*/}
                        {/*</div>*/}
                    {/*</Fragment>*/}
                {/*)*/}
            {/*})}*/}
            {categoriesMap&&Object.keys(categoriesMap).map((title) => {
                return (
                    <CategoryPreview title={title} key={title} products={categoriesMap[title]}/>
                )
            })}
        </>)
};
export default CategoriesPreview;