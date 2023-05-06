import React from 'react';

import {CancelIcon} from "../components/SvgIcons";

const Popup = (props) => {
    const {onHeaderContactClick} = props

    return (
        <div className="popup">
            <div className="popup__body">
                <div className="popup__close" onClick={onHeaderContactClick}>
                    <CancelIcon/>
                </div>
                <div className="popup__text">Працюємо щоденно та без вихідних з 9.00 до 21.00</div>
                <div className="popup__numbers">
                    <a href="tel:093 923-34-45">093 923-34-45</a>
                    <a href="tel:093 923-34-45">093 923-34-45</a>
                    <a href="tel:093 923-34-45">093 923-34-45</a>
                </div>
                <a href="mailto:info@bethoven.com.ua" className="popup__mail">info@bethoven.com.ua</a>
                <div className="popup__notice">Зателефонуйте мені</div>
                <div className="popup__inputs">
                    <input type="text" placeholder="Ім'я"/>
                    <input type="text" placeholder="Номер телефону"/>
                </div>
                <button className="popup__btn button --filled">Чекаю на дзвінок</button>
            </div>
        </div>
    );
};

export default Popup;