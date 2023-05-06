import React from 'react';
import HeaderMinimal from "../components/HeaderMinimal";
import FooterMinimal from "../components/FooterMinimal";
import Popup from "../components/Popup";

const MinimalLayout = ({children}, props) => {
    const [contactPopup, setContactPopup] = React.useState(false)

    const onHeaderContactClick = () => setContactPopup(!contactPopup)
    return (
        <>
            <div className="wrapper">
                <HeaderMinimal onHeaderContactClick={onHeaderContactClick}/>
                {children}
                <FooterMinimal/>
            </div>
            {contactPopup && <Popup onHeaderContactClick={onHeaderContactClick}/>}
        </>
    );
};

export default MinimalLayout;