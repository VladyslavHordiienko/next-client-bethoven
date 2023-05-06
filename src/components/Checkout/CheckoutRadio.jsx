import React from 'react';

import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {setPayment} from "../../redux/slices/CartSlice";



const CheckoutRadio = (props) => {
    const {radio} = props
    const router = useRouter()

    const dispatch = useDispatch()

    const onChangeRadio = (value) => {
         dispatch(setPayment(value))
    }

    return (

        <label htmlFor={radio.input_id}>
            <input
                className="radio"
                type="radio"
                name={radio.input_name}
                id={radio.input_id}
                onChange={(e) => {
                    radio.input_name === 'delivery'
                        ? e.target.checked && onChangeRadio(radio.deliveries_title_ua)
                        : e.target.checked && onChangeRadio(radio.payments_title_ua)
                }}
            />
            <span>
                            {
                                radio.input_name === 'delivery'
                                    ? radio['deliveries_title_' + router.locale]
                                    : radio['payments_title_' + router.locale]
                            }
                        </span>
        </label>
    );
};

export default CheckoutRadio;