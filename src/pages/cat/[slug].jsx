import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import CatalogBlock from "../../components/Catalog/CatalogBlock";
import Head from "next/head";
import {useRouter} from "next/router";
import {pathnameWithoutQuery} from "../../utils/lib";


const Category = (props) => {
    const {products, category, productAttr} = props
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{category['meta_title_' + router.locale ] }</title>
                <meta name="description" content={category['meta_description_' + router.locale ]}/>
                <link rel="alternate" hrefLang="uk" href={"http://localhost:3000" + pathnameWithoutQuery(router)}/>
                <link rel="alternate" hrefLang="ru" href={"http://localhost:3000/ru" + pathnameWithoutQuery(router)}/>
                {router.query.page && <meta name="robots" content="noindex, follow"/>}
            </Head>
            <MainLayout>
                <CatalogBlock products={products} categoryInfo={category} productAttr={productAttr}/>
            </MainLayout>
        </>
    );
};
export default Category;

export async function getServerSideProps({query}) {
    const categoryRes = await fetch(`http://localhost:4000/api/category/${query.slug}`)
    const category = await categoryRes.json()

    if(categoryRes.status === 404) return {notFound:true}

    const resProductAttr = await fetch(`http://localhost:4000/api/productAttr`)
    const productAttr = await resProductAttr.json()

    if(resProductAttr.status === 404) return {notFound:true}

    let str = !query.filterBy?.length
    ? `category=${category.id}&page=${query.page}`
        :`category=${category.id}&page=${query.page}&filterBy=${query.filterBy}`

    const productsRes = await fetch(`http://localhost:4000/api/product/?${str}`)
    const products = await productsRes.json()

    if(productsRes.status === 404) return {notFound:true}

    return {
        props: {products, category, productAttr}
    }
}