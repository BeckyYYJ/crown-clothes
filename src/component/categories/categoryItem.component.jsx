import './categoryItem.styles.scss'
import {useNavigate} from 'react-router-dom'
const CategoryItem = ({category}) => {
    const {imageUrl, title} = category;
    const navigate = useNavigate();
    const  navigateHandler = () => navigate(category.route);
    return (
        <div  className="categoryItem-container" onClick={navigateHandler}>
            <div className="background-image"
                 style={{
                backgroundImage: `url(${imageUrl})`,
            }}/>
            <div className="categoryItem-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
};

export default CategoryItem