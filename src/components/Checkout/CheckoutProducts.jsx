import React from 'react';
import Link from "next/link";
import {ArrowIcon, CancelIcon} from "../SvgIcons";
import uniqid from "uniqid";
import Image from "next/image";
import classNames from "classnames";
import {findItem} from "../../utils/lib";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {counterHandler, removeItem} from "../../redux/slices/CartSlice";

const CheckoutProducts = (props) => {
    const {cartItems} = props

    const dispatch = useDispatch()
    const router = useRouter()

    const deleteItem = (i) => dispatch(removeItem(i))
    const counterClick = (i, t) => dispatch(counterHandler({i, t}))

    return (
        <div className="checkout__products-box">
            <Link href="/" className="checkout__back flex">
                <ArrowIcon className={'arrow-icon'}/>
                <span>Повернутися до покупок</span>
            </Link>
            <div className="checkout__products">
                {cartItems.map(item => (
                    <div className="checkout__product" key={uniqid()}>
                        <div className="checkout__product-wrap flex">
                            <a href="#" className="checkout__img">
                                <Image
                                    src={`http://localhost:4000/static/${item.product.img.split(',')[0]}`}
                                    alt="" width={63} height={100}/>
                            </a>
                            <div className="checkout__product-text">
                                <a href="#"
                                   className="checkout__product-name">{`${item.product['product_name_' + router.locale]} (${item.product.product_weight} кг)`}</a>
                                <div className="checkout__code">Код
                                    товару: {item.product.factory_articul}</div>
                            </div>
                        </div>
                        <div className="checkout__product-wrap flex">
                            <div className="counter checkout__counter">
                                <button
                                    className={classNames("counter__btn", {'--disabled': findItem(cartItems, item.product.id).count <= 1})}
                                    onClick={() => counterClick(item.product, 'minus')}
                                >-
                                </button>
                                <input type="number"
                                       value={findItem(cartItems, item.product.id).count}
                                       className="counter__input"
                                       readOnly={true}/>
                                <button className="counter__btn"
                                        onClick={() => counterClick(item.product, 'plus')}>+
                                </button>
                            </div>
                            <div className="checkout__price-box card__price">
                                <strong>{findItem(cartItems, item.product.id).innerTotal} грн</strong>
                                {findItem(cartItems, item.product.id).count > 1
                                    ?
                                    <span>{findItem(cartItems, item.product.id).count} x {findItem(cartItems, item.product.id).product.price} грн</span>
                                    : null}

                            </div>
                            <div className="checkout__remove"
                                 onClick={() => deleteItem(item.product)}>
                                <CancelIcon/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckoutProducts;