import React from 'react';
import Link from "next/link";
import Image from "next/image";
import uniqid from "uniqid";
import {findItem} from "../utils/lib";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import MinimalLayout from "../layouts/MinimalLayout";
import ThankyouReceipt from "../components/Thankyou/ThankyouReceipt";
import {setInitialCart} from "../redux/slices/CartSlice";


const Thankyou = () => {
    const {cartItems} = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const router = useRouter()

    React.useEffect(() => {
      return () => {
          dispatch(setInitialCart())
      }
    }, [])

    return (
        <MinimalLayout>
            <main className="main">
                <div className="thankyou">
                    <div className="container">
                        <div className="title">Дякуємо за ваше замовлення!</div>
                        <div className="thankyou__row">
                            <div className="checkout__products thankyou__products">
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
                                            <div className="thankyou__quantity">
                                                {findItem(cartItems, item.product.id).count} шт.
                                            </div>
                                            <div className="checkout__price-box card__price thankyou__price-box">
                                                <strong>{findItem(cartItems, item.product.id).innerTotal} грн</strong>
                                                {findItem(cartItems, item.product.id).count > 1
                                                    ?
                                                    <span>{findItem(cartItems, item.product.id).count} x {findItem(cartItems, item.product.id).product.price} грн</span>
                                                    : null}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ThankyouReceipt/>
                        </div>
                        <Link href="/" className="not-found__btn button --filled">
                            Перейти на робочу сторінку
                        </Link>
                    </div>
                </div>
            </main>
        </MinimalLayout>
    );
};

export default Thankyou;