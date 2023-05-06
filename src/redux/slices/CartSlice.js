import {createSlice} from '@reduxjs/toolkit'
import {findItem} from "../../utils/lib";


const initialState = {
    cartItems: [],
    totalPrice: 0,
    totalCount: 0,
    deliveryCity: '',
    deliveryType: {},
    payment: '',
    fullName: '',
    phoneNumber: '',
    mail: '',
    comment: ''
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setInitialCart: (state, action) => {
                state.cartItems = [],
                state.totalPrice = 0,
                state.totalCount = 0,
                state.delivery = '',
                state.payment = '',
                state.fullName = '',
                state.phoneNumber = '',
                state.mail = '',
                state.comment = ''
        },
        addItem: (state, action) => {
            const found = findItem(state.cartItems, action.payload.id)
            if (!found) {
                state.cartItems = [...state.cartItems, {
                    product: action.payload,
                    count: 1,
                    innerTotal: action.payload.product_discount ? action.payload.product_discount : action.payload.product_price
                }]
                state.totalPrice += action.payload.product_discount ? action.payload.product_discount : action.payload.product_price
                state.totalCount += 1

            } else {
                found.count += 1
                found.innerTotal += action.payload.product_discount ? action.payload.product_discount : action.payload.product_price
                state.totalPrice += action.payload.product_discount ? action.payload.product_discount : action.payload.product_price
                state.totalCount += 1
            }
        },
        removeItem: (state, action) => {
            const found = findItem(state.cartItems, action.payload.id)
            state.cartItems = state.cartItems.filter(el => el.product.id !== action.payload.id)
            state.totalPrice -= action.payload.product_discount ? action.payload.product_discount : action.payload.product_price
            state.totalCount -= found.count
        },
        counterHandler: (state, action) => {
            const {i, t} = action.payload
            const found = findItem(state.cartItems, i.id)

            if (found && t === 'plus') {
                found.count += 1
                found.innerTotal += i.product_discount ? i.product_discount : i.product_price
                state.totalPrice += i.product_discount ? i.product_discount : i.product_price
                state.totalCount += 1
            }
            if (found && t === 'minus') {
                found.count -= 1
                found.innerTotal -= i.product_discount ? i.product_discount : i.product_price
                state.totalPrice -= i.product_discount ? i.product_discount : i.product_price
                state.totalCount -= 1
            }
        },
        setDeliveryCity: (state, action) => {
            state.deliveryCity = action.payload
        },
        setDeliveryType: (state, action) => {
            state.deliveryType = action.payload
        },
        setPayment: (state, action) => {
            state.payment = action.payload
        },
        setFullName: (state, action) => {
            state.fullName = action.payload
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload
        },
        setMail: (state, action) => {
            state.mail = action.payload
        },
        setComment: (state, action) => {
            state.comment = action.payload
        }
    }
})

export const {
    setInitialCart,
    addItem,
    removeItem,
    counterHandler,
    setDeliveryCity,
    setDeliveryType,
    setPayment,
    setFullName,
    setPhoneNumber,
    setMail,
    setComment
} = cartSlice.actions

export default cartSlice.reducer