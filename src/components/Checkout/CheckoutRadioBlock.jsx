import React from 'react';
import CheckoutRadio from "./CheckoutRadio";
import uniqid from "uniqid";

const CheckoutRadioBlock = (props) => {
    const {meant, items} = props

    return (
        <div className="checkout__radio">
            <div className="checkout__title-inner">
                {meant.title}
            </div>
            <div className="radio__list">
                {items && items.map(el => (
                    <CheckoutRadio radio={el} key={uniqid()} />
                ))}
            </div>
        </div>
    );
};

export default CheckoutRadioBlock;