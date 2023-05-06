import React from 'react';
import {useSelector} from "react-redux";

const ThankyouReceipt = () => {
    const {
        totalPrice,delivery, fullName
    } = useSelector(state => state.cart)
    return (
        <div className="checkout__pay thankyou__pay">
            <ul className="checkout__pay-info">
                <li className="flex">
                    <strong>Отримувач</strong>
                    <span>{fullName}</span>
                </li>
                <li className="flex">
                    <strong>Спосіб доставки</strong>
                    <span>{delivery}</span>
                </li>
                <li className="flex">
                    <strong>Вартість товарів</strong>
                    <span>{totalPrice} грн</span>
                </li>
                <li className="flex">
                    <strong>Вартість доставки</strong>
                    <span>За тарифами НП</span>
                </li>
            </ul>
            <div className="checkout__total">
                <strong>До сплати</strong>
                <span>{totalPrice} грн</span>
            </div>
        </div>
    );
};

export default ThankyouReceipt;