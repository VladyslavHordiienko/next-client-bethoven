import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Popup from "../components/Popup";

const MainLayout = ({children}, props) => {
    const [contactPopup, setContactPopup] = React.useState(false)

    const onHeaderContactClick = () => setContactPopup(!contactPopup)

    return (
        <>
            <div className="wrapper">
                <Header onHeaderContactClick={onHeaderContactClick}/>
                {children}
                <Footer/>
            </div>
            {contactPopup && <Popup onHeaderContactClick={onHeaderContactClick}/>}
        </>
    );
};

export default MainLayout;