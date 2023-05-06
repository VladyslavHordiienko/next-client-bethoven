import React from 'react';
import Link from "next/link";
import {CartIcon} from "./SvgIcons";
import {useSelector} from "react-redux";
import {useTranslation} from "next-i18next";

const CartBox = () => {
    const {totalCount} = useSelector(state => state.cart)
    const { t } = useTranslation('common')

    return (
        <Link href="/checkout" className="header__action flex">
            <div className="header__cart-box">
                <CartIcon className="cart-icon"/>
                {totalCount
                    ? <div className="header__cart-number flex">{totalCount}</div>
                    : null
                }
            </div>
            <span>{t('Кошик')}</span>
        </Link>
    );
};

export default CartBox;