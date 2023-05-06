import React from 'react';
import {useRouter} from "next/router";
import {pathnameWithoutQuery} from "../utils/lib";

const LangSwitcher = () => {
    const router = useRouter()

    const changeLocale = (l) => {
        setTimeout(() => {
            router.push(pathnameWithoutQuery(router), undefined, {locale: l})
        }, 200)
    }

    return (
        <div className="header-top__langbox flex">
            <label htmlFor="ukr" onClick={() => changeLocale('ua')}>
                <input readOnly={true} className="header-top__lang" type="radio"
                       name="lang_switcher" id="ukr" checked={router.locale==='ua'}/>
                <span className="header-top__langname --right">Укр</span>
            </label>
            <label htmlFor="rus" onClick={() => changeLocale('ru')}>
                <input readOnly={true} className="header-top__lang" type="radio"
                       name="lang_switcher" id="rus" checked={router.locale==='ru'}/>
                <span className="header-top__langname --left">Рус</span>
            </label>
        </div>
    );
};

export default LangSwitcher;