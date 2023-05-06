import React from 'react';
import MinimalLayout from "../layouts/MinimalLayout";
import {useSelector} from "react-redux";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import CheckoutRadioBlock from "../components/Checkout/CheckoutRadioBlock";
import CheckoutReceipt from "../components/Checkout/CheckoutReceipt";
import CheckoutContact from "../components/Checkout/CheckoutContact";
import CheckoutDelivery from "../components/Checkout/CheckoutDelivery";
import CheckoutEmpty from "../components/Checkout/CheckoutEmpty";
import CheckoutProducts from "../components/Checkout/CheckoutProducts";
import {useTranslation} from "next-i18next";

const Checkout = (props) => {
    const {deliveries, payments} = props

    const cartItems = useSelector(state => state.cart.cartItems)

    const { t } = useTranslation('common');

    if (!cartItems.length) {
        return (
            <MinimalLayout>
                <CheckoutEmpty/>
            </MinimalLayout>
        )
    }

    return (
        <MinimalLayout>
            <main className="main">
                <section className="checkout">
                    <div className="container">
                        <div className="title">{t('Кошик')}</div>
                        <div className="checkout__top">
                            <CheckoutProducts cartItems={cartItems}/>
                            <CheckoutReceipt/>
                        </div>
                        <div className="checkout__bottom">
                            <CheckoutContact/>
                            <CheckoutDelivery items={deliveries}/>
                            <CheckoutRadioBlock items={payments} meant={{type: 'payments', title: 'Спосіб оплати'}}/>
                        </div>
                    </div>
                </section>
            </main>
        </MinimalLayout>
    );
};

export default Checkout;

export async function getServerSideProps({locale}) {
    const resDeliveries = await fetch(`http://localhost:4000/api/deliveries`)
    const deliveries = await resDeliveries.json()

    const resPayments = await fetch(`http://localhost:4000/api/payments`)
    const payments = await resPayments.json()

    if (resDeliveries.status === 404 || resPayments.status === 404) return {notFound: true}

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common'
            ])),
            deliveries,
            payments
        }
    }
}
