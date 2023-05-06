import React from 'react';
import Image from "next/image";
import Link from "next/link";

const CheckoutEmpty = (props) => {
    return (
        <section className="checkout checkout__empty">
            <div className="container">
                <div className="title">Кошик</div>
                <Image className="checkout__empty-icon" src="/cart.svg" alt="" width={250} height={250}  style={{ height: '100%', width: '100%' }} />
                <div className="checkout__empty-title not-found__title">Ваш кошик порожній</div>
                <div className="checkout__text not-found__text">Ви ще нічого не додали до кошика або видалили обрані товари</div>
                <Link href="/" className="not-found__btn button --filled">
                    Перейти на робочу сторінку
                </Link>
            </div>
        </section>
    );
};

export default CheckoutEmpty;