import React from 'react';
import ProductGrid from "./Catalog/ProductGrid";
import Image from "next/image";
import Link from "next/link";

const SearchPageCatalog = (props) => {
    const {products, title,productAttr} = props
    if(!products.length){
        return (
                <section className="catalog search__empty">
                    <div className="container">
                        <h1 className="title">{title}</h1>
                        <Image className="search__empty-icon" src="/search_failed.svg" alt="" width={250} height={250}  style={{ height: '100%', width: '100%' }} />
                        <div className="search__empty-title not-found__title">Нажаль, нічого не знайдено</div>
                        <div className="search__empty not-found__text">За вашим запитом нічого не здайдено. Спробуйте пошукати за іншим запитом.</div>
                        <Link href="/" className="not-found__btn button --filled">
                            Перейти на робочу сторінку
                        </Link>
                    </div>
                </section>
        )
    }

    return (
        <section className="catalog">
            <div className="container">
                <h1 className="title">{title}</h1>
                <div className="catalog__wrap flex">
                    <ProductGrid products={products} productAttr={productAttr} />
                </div>
            </div>
        </section>
    );
};

export default SearchPageCatalog;