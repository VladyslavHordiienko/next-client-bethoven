import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setComment, setFullName, setMail, setPhoneNumber} from "../../redux/slices/CartSlice";
import {fullNameValidation, mailValidation, phoneNumberValidation} from "../../utils/validations";

const CheckoutContact = () => {
    const fullName = useSelector(state => state.cart.fullName)
    const phoneNumber = useSelector(state => state.cart.phoneNumber)
    const mail = useSelector(state => state.cart.mail)
    const comment = useSelector(state => state.cart.comment)

    const dispatch = useDispatch()

    const onChangeContactInput = (e, inputMeant) => {
        switch (inputMeant) {
            case 'fullName': {
                dispatch(setFullName(e.target.value))
                if (!fullNameValidation(e.target.value)) {
                    return e.target.classList.add('--invalid')
                }
                return e.target.classList.remove('--invalid')
            }
            case 'phoneNumber': {
                dispatch(setPhoneNumber(e.target.value))
                if (!phoneNumberValidation(e.target.value)) {
                    return e.target.classList.add('--invalid')
                }
                return e.target.classList.remove('--invalid')
            }
            case 'mail': {
                dispatch(setMail(e.target.value))
                if (!mailValidation(e.target.value)) {
                    return e.target.classList.add('--invalid')
                }
                return e.target.classList.remove('--invalid')
            }
        }
    }

    return (
        <div className="checkout__contact">
            <div className="checkout__title-inner">
                Контакти одержувача
            </div>
            <div className="checkout__fields">
                <div className="checkout__inputs">
                    <input
                        type="text"
                        placeholder="Ім'я та прізвище"
                        value={fullName}
                        onChange={(e) => onChangeContactInput(e, 'fullName')}
                    />
                    <input
                        type="number"
                        placeholder="Номер телефону"
                        value={phoneNumber}
                        onChange={(e) => onChangeContactInput(e, 'phoneNumber')}
                    />
                    <input
                        type="text"
                        placeholder="Електронна пошта"
                        value={mail}
                        onChange={(e) => onChangeContactInput(e, 'mail')}
                    />
                </div>
                <textarea
                    className="checkout__textarea"
                    placeholder="Коментар (не обов’язково)"
                    value={comment}
                    onChange={(e) => dispatch(setComment(e.target.value))}
                />
            </div>
        </div>
    );
};

export default CheckoutContact;