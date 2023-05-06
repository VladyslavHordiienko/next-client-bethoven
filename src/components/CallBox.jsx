import React from 'react';
import {ArrowIcon, PhoneIcon} from "./SvgIcons";
import {useTranslation} from "next-i18next";

const CallBox = (props) => {
    const {onHeaderContactClick} = props
    const { t } = useTranslation('common')

    return (
        <div className="header__action flex" onClick={onHeaderContactClick}>
            <PhoneIcon className={'phone-icon'}/>
            <div className="flex col">
                <div className="flex">
                            <span>
                                {t('Контакти')}
                            </span>
                    <ArrowIcon className={'arrow-icon'}/>
                </div>
                <button className="header__contact">{t('Замовити дзвінок')}</button>
            </div>
        </div>
    );
};

export default CallBox;