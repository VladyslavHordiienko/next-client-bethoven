import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import PopularProductsSlide from "./PopularProductsSlide";
import uniqid from "uniqid";

const PopularProducts = (props) => {
    const {products,productAttr} = props

    return (
        <section className="popular">
            <div className="container">
                <div className="title">Популярні товари</div>
                <Swiper
                    className="popular__swiper swiper"
                    watchOverflow={true}
                    slidesPerView={4}
                    breakpoints={{
                        319:{
                            slidesPerView:1
                        },
                        479:{
                            slidesPerView:2
                        },
                        767:{
                            slidesPerView:3
                        },
                        1023:{
                            slidesPerView:4
                        }
                    }}
                >
                    {products && products.map(p => (
                        <SwiperSlide key={uniqid()}>
                            <PopularProductsSlide slide={p} productAttr={productAttr}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PopularProducts;