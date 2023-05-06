import React from 'react';
import {useSelector} from "react-redux";

const CheckoutReceipt = () => {
    const {
        cartItems,totalPrice,deliveryCity,deliveryType,payment, fullName, phoneNumber, mail, comment
    } = useSelector(state => state.cart)


    const submitOrder = async () => {
        let  products_list = cartItems.map(el => {
            return {
                count: el.count,
                innerTotal: el.innerTotal,
                info: el.product
            }
        })

        try {
            const response = await fetch("http://localhost:4000/api/basket", {
                method: "POST",
                body: JSON.stringify({
                    products_list,
                    contact_info:{
                        fullName,
                        phoneNumber,
                        mail,
                        comment
                    },
                    delivery_info:{deliveryCity,deliveryType},
                    payment_info:payment,
                    totalPrice
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="checkout__pay">
            <ul className="checkout__pay-info">
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
            <button
                className="checkout__btn button --filled"
                onClick={() => submitOrder()}
            >
                Оформити замовлення
            </button>
            <div className="checkout__terms">
                Підтверджуючи замовлення, я приймаю умови <a href="#">Угоди користувача</a>
            </div>
        </div>
    );
};

export default CheckoutReceipt;