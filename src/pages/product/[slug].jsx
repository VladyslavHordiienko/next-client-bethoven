import React from 'react';
import MainLayout from "../../layouts/MainLayout";

import {CartIcon} from "../../components/SvgIcons";
import Image from "next/image";

import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import uniqid from "uniqid";
import Breadcrumbs from "../../components/Breadcrumbs";
import {useDispatch} from "react-redux";
import {addItem} from "../../redux/slices/CartSlice";
import {useRouter} from "next/router";
import Head from "next/head";
import {pathnameWithoutQuery} from "../../utils/lib";
import parse from "html-react-parser";

const Card = (props) => {
    const {singleProduct, category, categoriesList, productAttr} = props
    const dispatch = useDispatch()
    const router = useRouter()

    const addToCart = (item) => {
        dispatch(addItem(item))
    }

    const makeInfoTable = () => {
        let infoTitle = productAttr?.filter(attr => JSON.parse(attr.category_list)?.includes(singleProduct.product.categoryId))

        return singleProduct.product.info
            .filter(i => infoTitle.find(el => el.id === i.productAttrId))
            .map(el => (
                {
                    title: infoTitle.find(attr => attr.id === el.productAttrId)['title_' + router.locale],
                    value: el['value_' + router.locale]
                }
            ))
    }

    const info = makeInfoTable()
    return (
        <>
            <Head>
                <title>{singleProduct.product['meta_title_' + router.locale]}</title>
                <meta name="description" content={singleProduct.product['meta_description_' + router.locale]}/>
                <link rel="alternate" hrefLang="uk" href={"http://localhost:3000" + pathnameWithoutQuery(router)}/>
                <link rel="alternate" hrefLang="ru" href={"http://localhost:3000/ru" + pathnameWithoutQuery(router)}/>
            </Head>
            <MainLayout>
                <main className="main">
                    <Breadcrumbs breadcrumbs={singleProduct.breadcrumbs}/>
                    <section className="card">
                        <div className="container">
                            <div className="title">{singleProduct.product['product_name_' + router.locale]}</div>
                            <div className="card__row">
                                <Swiper className="card__swiper swiper">
                                    {
                                        singleProduct.product.img.split(',').map(slide => (
                                            <SwiperSlide className="swiper-slide" key={uniqid()}>
                                                <Image src={`http://localhost:4000/static/${slide}`} alt="" className=""
                                                       width={320} height={511}/>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <div className="card__content">
                                    <div className="card__modifications">
                                        {singleProduct.product.product_status
                                            ? <div className="card__availability --available">
                                                <strong>В наявності</strong>
                                                <span>Код товару: {singleProduct.product.product_code}</span>
                                            </div>
                                            : <div className="card__availability --unavailable">
                                                <strong>Під замовлення</strong>
                                                <span>Код товару: {singleProduct.product.product_code}</span>
                                            </div>
                                        }
                                        <ul className="card__modifications-list">
                                            {
                                                singleProduct.product.product_modification.map(mod => (
                                                    <li className="card__modification" key={uniqid()}>
                                                        <div className="card__weight">{mod.product_weight} кг</div>
                                                        {mod.product_discount
                                                            ? <div className="card__price">
                                                                <div
                                                                    className="product-grid__oldprice">{mod.product_price}</div>
                                                                <strong>{mod.product_discount}</strong>
                                                                <span>165 грн/кг</span>
                                                            </div>
                                                            : <div className="card__price">
                                                                <strong>{mod.product_price}</strong>
                                                                <span>165 грн/кг</span>
                                                            </div>
                                                        }
                                                        <button
                                                            className="button --filled"
                                                            type="button"
                                                            onClick={() => addToCart({
                                                                img: singleProduct.product.img,
                                                                product_name: singleProduct.product.product_name_ua, ...mod
                                                            })}
                                                        >
                                                            <CartIcon/>
                                                            <span>
                                                Купити
                                            </span>
                                                        </button>
                                                    </li>
                                                ))

                                            }
                                        </ul>
                                    </div>
                                    <div className="card__info">
                                        <div className="card__info-item">
                                            <div className="card__title-inner">Зручна доставка</div>
                                            <ul className="card__info-list">
                                                <li>У відділення Нової пошти</li>
                                                <li>Кур'єрська доставка Новою поштою</li>
                                            </ul>
                                            <div className="card__notice">Безкоштовна доставка від 2000 грн</div>
                                        </div>
                                        <div className="card__info-item">
                                            <div className="card__title-inner">Оплата без комісії</div>
                                            <ul className="card__info-list">
                                                <li>Готівкою при отриманні</li>
                                                <li>Карта Visa/Mastercard</li>
                                            </ul>
                                        </div>
                                        <div className="card__info-item">
                                            <div className="card__title-inner">Гарантія та повернення</div>
                                            <ul className="card__info-list">
                                                <li>Якісний товар обміну та поверненню не підлягає</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div className="card__attrs">
                                    {info
                                        ? <table className="card__table">
                                            <tbody>
                                            {info.map((i) => (
                                                <tr key={uniqid()}>
                                                    <td><span>{i.title}</span></td>
                                                    <td><span>{i.value}</span></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : null
                                    }

                                    <div className="card__discount-notification">
                                        <strong>Знижка 5%</strong> при оплаті на карту
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="card-description">
                        <div className="container">
                            <div className="text-box">
                                {parse(singleProduct.product['seo_text_' + router.locale])}
                            </div>
                        </div>
                    </section>
                </main>
            </MainLayout></>
    );
};

export default Card;

export async function getServerSideProps({params}) {
    const resProductAttr = await fetch(`http://localhost:4000/api/productAttr`)
    const productAttr = await resProductAttr.json()

    const resProduct = await fetch(`http://localhost:4000/api/product/${params.slug}`)
    const singleProduct = await resProduct.json()

    if(resProductAttr.status === 404 || resProduct.status === 404) return {notFound:true}

    return {props: {singleProduct, productAttr}}
}
