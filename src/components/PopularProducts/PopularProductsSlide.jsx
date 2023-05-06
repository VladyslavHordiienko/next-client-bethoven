import React from 'react';
import Image from "next/image";
import {CartIcon} from "../SvgIcons";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {addItem} from "../../redux/slices/CartSlice";
import uniqid from "uniqid";
import {useRouter} from "next/router";
import classNames from "classnames";
import {calcPercent, makeInfoTable} from "../../utils/lib";


const PopularProductsSlide = (props) => {
    const {slide,productAttr} = props

    const [activeModification, setActiveModification] = React.useState(slide.product_modification[0])
    const dispatch = useDispatch()
    const router = useRouter();

    //
    // let infoTitle = productAttr
    //     .filter(attr => JSON.parse(attr.category_list)?.includes(slide.categoryId))
    //     .filter(attr => attr.isFilter)
    //
    // let info = slide.info
    //     .filter(i => infoTitle.find(el => el.id === i.productAttrId))
    //     .map(el => (
    //         {
    //             title: infoTitle.find(attr => attr.id === el.productAttrId)['title_' + router.locale],
    //             value: el['value_' + router.locale]
    //         }
    //     ))

    const addToCart = (item) => {
        dispatch(addItem(item))
    }

    const infoTable = makeInfoTable(productAttr,slide,router)

    return (
        <div className="popular-product__item">
            <Link href={`/product/${slide.slug}`} className="product-grid__img">
                <Image src={`http://localhost:4000/static/${slide.img.split(',')[0]}`} alt="" width={150} height={240}/>
            </Link>
            <Link href={`/product/${slide.slug}`} className="product-grid__title">
                {slide['product_name_' + router.locale]}
            </Link>


            <div className="product-grid__modifications flex">
                {slide.product_modification.map(m => (
                    <div
                        className={classNames("product-grid__weight", {'--active': m.id === activeModification.id})}
                        key={uniqid()}
                        onClick={() => setActiveModification(m)}
                    >
                        {m.product_weight} кг
                    </div>
                ))}

            </div>
            <div className="product-grid__action flex sb">
                {
                    activeModification.product_discount
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
                            img: slide.img,
                            product_name_ua: slide.product_name_ua,
                            product_name_ru: slide.product_name_ru, ...activeModification
                        })}>
                    <CartIcon/>
                    <span>
                        Купити
                        </span>
                </button>
            </div>

            <div className="product-grid__info popular-product__info">
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
    );
};

export default PopularProductsSlide;