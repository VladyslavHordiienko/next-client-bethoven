import React from 'react';
import {FilterIcon} from "../SvgIcons";
import Filter from "../Filter/Filter";
import ProductGrid from "./ProductGrid";
import Breadcrumbs from "../Breadcrumbs";
import {useRouter} from "next/router";

const CatalogBlock = (props) => {
    const {products, categoryInfo, productAttr} = props

    const router = useRouter()
    const filterItems = productAttr
        .filter(el => el.isFilter)
        .map(f => {
        return {
            filter_name: f,
            filter_list: products.allInfo
                    .reduce((acc,el) => {
                        if(el.productAttrId === f.id){
                            acc.push(el)
                        }
                    return acc
                },[])
                .reduce((acc, el) => {
                    if(!acc.find(inner => inner.value_back === el.value_back)){
                        acc.push(el);
                    }
                    return acc;
                }, [])
            }
    })

    return (
        <main className="main">
            <Breadcrumbs breadcrumbs={products.breadcrumbs}/>
            <section className="catalog">
                <div className="container">
                    <h1 className="title">{categoryInfo['category_name_' + router.locale]}</h1>
                    <div className="catalog__wrap flex">
                        <div className="filter__wrap">
                            <button className="filter__mobile-btn button --filled">
                                <FilterIcon/>
                                <span>Фильтр</span>
                            </button>
                            <Filter products={products.products} filterItems={filterItems}/>
                        </div>
                        <ProductGrid products={products.products} categoryInfo={categoryInfo} productAttr={productAttr}/>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CatalogBlock;