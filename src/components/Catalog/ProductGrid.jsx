import React from 'react';
import parse from 'html-react-parser';
import ProductCell from "./ProductCell";
import Paginations from "../Paginations";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../../redux/slices/GeneralSlice";


const ProductGrid = (props) => {
    let {products, categoryInfo, productAttr} = props
    const {currentPage, limitPerPage} = useSelector(state => state.general)
    const [categoryPath, setCategoryPath] = React.useState(null)
    const router = useRouter()
    const dispatch = useDispatch()

    //CURRENT PRODUCTS
    const indexOfTheLast = currentPage * limitPerPage
    const indexOfTheFirst = indexOfTheLast - limitPerPage
    const currentProducts = products.slice(indexOfTheFirst,indexOfTheLast)

    React.useEffect(() =>{
        setCategoryPath(router.asPath.split('?')[0])
    },[router])
    React.useEffect(() =>{
            dispatch(setCurrentPage(1))
    },[categoryPath])
    return (
        <div className="catalog__right">
            <div className="product-grid">
                {
                    currentProducts.map(item => (
                        <ProductCell product={item} productAttr={productAttr} key={item.id}/>
                    ))
                }
            </div>
            <Paginations
                count={products.length}
            />
            {categoryInfo && (
                <div className="text-box">
                    {parse(categoryInfo['seo_text_' + router.locale])}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;