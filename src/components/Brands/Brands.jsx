import React from 'react';
import Image from "next/image";

import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css';

const Brands = () => {
    return (
        <section className="brands">
            <div className="container">
                <div className="title">Бренди</div>
                <Swiper
                    className="brands__swiper swiper"
                    watchOverflow={true}
                    spaceBetween={40}
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
                    <SwiperSlide>
                        <Image src="/brand1.png" alt="" width={270} height={180}  style={{ height: '100%', width: '100%' }}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src="/brand1.png" alt="" width={270} height={180}  style={{ height: '100%', width: '100%' }}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src="/brand1.png" alt="" width={270} height={180}  style={{ height: '100%', width: '100%' }}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src="/brand1.png" alt="" width={270} height={180}  style={{ height: '100%', width: '100%' }}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src="/brand1.png" alt="" width={270} height={180}  style={{ height: '100%', width: '100%' }}/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default Brands;