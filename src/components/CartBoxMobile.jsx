import React from 'react';
import Link from "next/link";
import {CartIcon} from "./SvgIcons";
import {useSelector} from "react-redux";

const CartBoxMobile = () => {
    const {totalCount} = useSelector(state => state.cart)

    return (
        <Link href="/checkout" className="header__action flex">
            <div className="header__cart-box">
                <CartIcon className="cart-icon"/>
                {totalCount
                    ? <div className="header__cart-number flex">{totalCount}</div>
                    : null
                }
            </div>
        </Link>
    );
};

export default CartBoxMobile;