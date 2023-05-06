import React from 'react';
import Image from "next/image";
import {CartIcon} from "../SvgIcons";
import Link from "next/link";
import {addItem} from "../../redux/slices/CartSlice";
import {useDispatch} from "react-redux";
import uniqid from "uniqid";
import classNames from "classnames";
import {calcPercent, makeInfoTable} from "../../utils/lib";
import {useRouter} from "next/router";

const ProductCell = (props) => {
    const {product,productAttr} = props
    const [activeModification, setActiveModification] = React.useState(product.product_modification[0])
    const dispatch = useDispatch()
    const router = useRouter()

    const addToCart = (item) => {
        dispatch(addItem(item))
    }
    const infoTable = makeInfoTable(productAttr,product,router)
    // console.log(productAttr)
    return (
        <div className="product-grid__item">
            <Link href={`/product/${product.slug}`} className="product-grid__img">
                <Image src={`http://localhost:4000/static/${product.img.split(',')[0]}`} alt="" width={150} height={240}/>
            </Link>
            <Link className="product-grid__title" href={`/product/${product.slug}`}>
                {product.product_name_ua}
            </Link>

                <div className="product-grid__modifications flex">
                    {product.product_modification && product.product_modification.map(m => (
                        <div
                            className={classNames("product-grid__weight", {'--active': m.id === activeModification?.id})}
                            key={uniqid()}
                            onClick={() => setActiveModification(m)}
                        >
                            {m.product_weight} кг
                        </div>
                    ))}

                </div>
                <div className="product-grid__action flex sb">
                    {
                        activeModification && activeModification.product_discount
                            ? <div className="product-grid__price-box">
                                <div className="product-grid__oldprice">{activeModification.product_price}</div>
                                <div className="product-grid__price">{activeModification.product_discount} грн</div>
                                <div
                                    className="product-grid__percent">{calcPercent(activeModification.product_price, activeModification.product_discount)} %
                                </div>
                            </div>
                            : <div className="product-grid__price-box">
                                <div className="product-grid__price">{activeModification.product_price} грн</div>
                            </div>
                    }

                    <button className="product-grid__button button --filled" type="button"
                            onClick={() => addToCart({
                                img: product.img,
                                product_name_ua: product.product_name_ua,
                                product_name_ru: product.product_name_ru, ...activeModification
                            })}>
                        <CartIcon/>
                        <span>
                        Купити
                        </span>
                    </button>
                </div>


            <div className="product-grid__info-holder">
            <div className="product-grid__info">
                {
                    infoTable && infoTable.map(el => (
                        <div className="product-grid__info-row" key={uniqid()}>
                            <strong><span>{el.title}</span></strong>
                            <div>{el.value}</div>
                        </div>
                    ))
                }
            </div>
            </div>
        </div>
    );
};

export default ProductCell;