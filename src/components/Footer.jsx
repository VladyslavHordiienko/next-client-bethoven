import React from 'react';
import {useTranslation} from "next-i18next";

const Footer = () => {
    const [isMobile, setIsMobile] = React.useState(false)
    const { t } = useTranslation('common')

    React.useEffect(() => {
        document.documentElement.clientWidth <= 1024
            ? setIsMobile(true)
            : setIsMobile(false)
        window.addEventListener('resize', () => {
            document.documentElement.clientWidth <= 1024
                ? setIsMobile(true)
                : setIsMobile(false)
        })
    }, [])
    if(!isMobile){
        return (
            <footer className="footer">
                <div className="container">
                    <div className="footer__head">
                        <div className="footer__title">{t("Корисна інформація")}</div>
                        <div className="footer__title">{t("Контакти")}</div>
                    </div>
                    <div className="footer__body">
                        <nav className="footer__list">
                            <a href="#">{t("Відповіді на запитання")}</a>
                            <a href="#">{t("Оплата та доставка")}</a>
                            <a href="#">{t("Повернення товарів")}</a>
                            <a href="#">{t("Політика конфіденційності")}</a>
                        </nav>
                        <div className="footer__numbers">
                            <a href="tel:093 923-34-45">093 923-34-45</a>
                            <a href="tel:093 923-34-45">093 923-34-45</a>
                            <a href="tel:093 923-34-45">093 923-34-45</a>
                            <button className="footer__button">{t("Замовити дзвінок")}</button>
                        </div>
                        <a href="mailto:info@lubimchik.com.ua" className="footer__mail">info@lubimchik.com.ua</a>
                        <div className="footer__copy">
                            {t("copyright")}
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
    return(
        <footer className="footer --mobile">
            <div className="container">
                <div className="footer__title">Корисна інформація</div>
                <nav className="footer__list">
                    <a href="#">Відповіді на запитання</a>
                    <a href="#">Оплата та доставка</a>
                    <a href="#">Повернення товарів</a>
                    <a href="#">Політика конфіденційності</a>
                </nav>
                <div className="footer__title">Контакти</div>
                <div className="footer__numbers">
                    <a href="tel:093 923-34-45">093 923-34-45</a>
                    <a href="tel:093 923-34-45">093 923-34-45</a>
                    <a href="tel:093 923-34-45">093 923-34-45</a>
                    <button className="footer__button">Замовити дзвінок</button>
                </div>
                <a href="mailto:info@lubimchik.com.ua" className="footer__mail">info@lubimchik.com.ua</a>
                <div className="footer__copy">
                    © 2023 Інтернет-магазин зоотоварів Bethoven
                </div>

            </div>
        </footer>
    )

};

export default Footer;