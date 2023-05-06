import {
    combineReducers,
    configureStore
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import storage from 'redux-persist/lib/storage'
import homeReducer from "./slices/HomeSlice";
import generalReducer from "./slices/GeneralSlice";
import filterReducer from "./slices/FilterSlice";
import cartReducer from "./slices/CartSlice";
import {persistReducer, persistStore} from "redux-persist";
import { getPersistConfig } from 'redux-deep-persist';


const combinedReducer  = combineReducers({
    general: generalReducer,
    home: homeReducer,
    filter: filterReducer,
    cart: cartReducer,
})

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = ({isServer}) =>{
    if(isServer){
        return  configureStore({
            reducer,
        });
    }
    const persistConfig = getPersistConfig({
        key: "root",
        storage: storage,
        whitelist: ['cart.cartItems', 'cart.totalPrice', 'cart.totalCount'],
        rootReducer:combinedReducer
    })
    const persistedReducer = persistReducer(persistConfig, combinedReducer);
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false
        })),
    });
    store.__persisitor = persistStore(store);
    return store;
}


export const wrapper = createWrapper(makeStore, { debug: true });

