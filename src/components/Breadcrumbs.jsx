import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import uniqid from "uniqid";

const Breadcrumbs = (props) => {
    const {breadcrumbs} = props

    const router = useRouter();

    const renderCrumbs = () => {
            return breadcrumbs.map((el,i) => {
                return (
                    <li itemProp="itemListElement" itemScope
                        itemType="https://schema.org/ListItem" key={uniqid()}>
                        {breadcrumbs.length === 1
                            ?  <><span itemProp="name" >{el['category_name_' + router.locale]}</span>
                                <meta itemProp="position" content={i + 2}/>
                                </>
                            :
                               <>
                                   <Link
                                       itemProp="item"
                                       href={`/cat/${el.slug}`}><span  itemProp="name">{el['category_name_' + router.locale]}</span></Link>
                                   <meta itemProp="position" content={i + 2}/>
                               </>
                        }
                    </li>
                );
            })
    }
    return (
    <section className="breadcrumbs">
            <div className="container">
                <ul itemScope itemType="https://schema.org/BreadcrumbList" className="breadcrumbs__list flex">
                    <li  itemProp="itemListElement" itemScope
                         itemType="https://schema.org/ListItem" className="breadcrumbs__item ">
                        <Link itemProp="item" href="/"><span itemProp="name">Главная</span></Link>
                        <meta itemProp="position" content="1"/>
                    </li>
                    {renderCrumbs()}
                </ul>
            </div>
        </section>
    );
};

export default Breadcrumbs;