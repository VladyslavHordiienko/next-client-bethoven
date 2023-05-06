import React from 'react';
import {ArrowIcon, PhoneIcon} from "./SvgIcons";

const CallBoxMobile = (props) => {
    const {onHeaderContactClick} = props

    return (
        <div className="header__action flex" onClick={onHeaderContactClick}>
            <PhoneIcon className={'phone-icon'}/>
        </div>
    );
};

export default CallBoxMobile;