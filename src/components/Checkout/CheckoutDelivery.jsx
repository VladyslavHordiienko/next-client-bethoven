import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {setDeliveryCity, setDeliveryType} from "../../redux/slices/CartSlice";
import {notEmptyValidation} from "../../utils/validations";


const CheckoutDelivery = (props) => {
    const {items} = props
    const deliveryCity = useSelector(state => state.cart.deliveryCity)
    const deliveryType = useSelector(state => state.cart.deliveryType)

    const [np, setNp] = React.useState([])

    const [radioPostal, setRadioPostal] = React.useState(false)
    const [radioCourier, setRadioСourier] = React.useState(false)

    const router = useRouter()
    const dispatch = useDispatch()

    const onCourierInputChange = (e, name) => {
        if(!notEmptyValidation(e.target.value)){
            return e.target.classList.add('--invalid')
        }
        dispatch(setDeliveryType({...deliveryType, type: 'courier', [name]: e.target.value}))
        return e.target.classList.remove('--invalid')
    }

    const cities = np.map(el => el['city_' + router.locale]).filter((v, i, a) => a.indexOf(v) === i)
    const branch = np.filter(el => el['city_' + router.locale].includes(deliveryCity)).map(el => el['branch_' + router.locale])

    React.useEffect(() => {
        (async function fetchNp() {
            const npRes = await fetch(`http://localhost:4000/api/novaposhta`)
            const np = await npRes.json()
            setNp(np)
        })()
    }, [])
    return (
        <div className="checkout__radio">
            <div className="checkout__title-inner">
                Спосіб доставки
            </div>
            <div className="checkout__city">
                <Autocomplete
                    options={cities}
                    id="auto-city"
                    className="autocomplete"
                    autoComplete
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label={'Вкажіть ваш населений пункт'}/>
                    )}
                    onInputChange={(e, newInputVal) => dispatch(setDeliveryCity(newInputVal))}
                    noOptionsText={'Населений пункт не знайдено.'}
                />
            </div>

            {deliveryCity && <div className="radio__list">
                <label htmlFor={items[0].input_id}>
                    <input
                        className="radio"
                        type="radio"
                        name={items[0].input_name}
                        id={items[0].input_id}
                        onChange={(e) => {
                            setRadioСourier(false)
                            setRadioPostal(true)
                            dispatch(setDeliveryType({}))
                        }}
                        defaultChecked={radioPostal}
                    />
                    <span>{items[0]['deliveries_title_' + router.locale]}</span>
                </label>

                {radioPostal && <Autocomplete
                    options={branch}
                    id="auto-branch"
                    className="autocomplete"
                    autoComplete
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label={'Виберіть відділення'}/>
                    )}
                    onChange={(e, newInputVal) => dispatch(setDeliveryType({type:'postal', title: newInputVal}))}
                    noOptionsText={'Відділення не знайдено.'}
                />}

                <label htmlFor={items[1].input_id}>
                    <input
                        className="radio"
                        type="radio"
                        name={items[1].input_name}
                        id={items[1].input_id}
                        onChange={(e) => {
                            setRadioСourier(true)
                            setRadioPostal(false)
                            dispatch(setDeliveryType({}))
                        }}
                        defaultChecked={radioCourier}
                    />
                    <span>{items[1]['deliveries_title_' + router.locale]}</span>
                </label>
                {
                    radioCourier && <div className="checkout__inputs">
                        <input type="text" placeholder={'Вулиця'} onChange={(e) => onCourierInputChange(e, 'street')}/>
                        <input type="text" placeholder={'Будинок'} onChange={(e) => onCourierInputChange(e, 'house')}/>
                        <input type="text" placeholder={'Квартира'} onChange={(e) => onCourierInputChange(e, 'apartment')}/>
                    </div>
                }
            </div>}
        </div>
    );
};

export default CheckoutDelivery;