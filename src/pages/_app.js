import '@/assets/css/main.scss'
import {wrapper} from "../redux/store";
import {Provider} from "react-redux";
import { appWithTranslation } from 'next-i18next'


function App({Component, pageProps}) {
    const {store, props} = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default appWithTranslation(App)