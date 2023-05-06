import Head from 'next/head'
import MainLayout from "../layouts/MainLayout";
import Image from "next/image";

import PopularProducts from "../components/PopularProducts/PopularProducts";
import Brands from "../components/Brands/Brands";
import SeoDescription from "../components/SeoDescription";

import React from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Home(props) {
    const {products,productAttr} = props

    return (
        <>
            <Head>
                <title>Главная</title>
                <link rel="alternate" hrefLang="uk" href="http://localhost:3000"/>
                <link rel="alternate" hrefLang="ru" href="http://localhost:3000/ru"/>
            </Head>
            <MainLayout>
                <main className="main">
                    <section className="banner">
                        <div className="container">
                            <Image src="/home-banner.png" alt="" className="banner__img" width={1200} height={470}/>
                        </div>
                    </section>
                    <PopularProducts products={products.products} productAttr={productAttr}/>
                    <Brands/>
                    <SeoDescription/>
                </main>
            </MainLayout>
        </>
    )
}


export async function getServerSideProps({locale}) {
    const resProductAttr = await fetch(`http://localhost:4000/api/productAttr`)
    const productAttr = await resProductAttr.json()

    const resProducts = await fetch(`http://localhost:4000/api/product/?limit=5`)
    const products = await resProducts.json()

    if(resProductAttr.status === 404 || resProducts.status === 404) return {notFound: true}

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common'
            ])),
            products,
            productAttr
        }
    }
}
