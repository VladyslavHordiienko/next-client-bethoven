import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { DeliveryIcon, BurgerIcon, CancelIcon } from './SvgIcons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../redux/slices/GeneralSlice';
import CartBox from './CartBox';
import CallBox from './CallBox';
import CallBoxMobile from './CallBoxMobile';
import CartBoxMobile from './CartBoxMobile';
import LangSwitcher from './LangSwitcher';
import classNames from 'classnames';
import SearchInput from "./SearchInput";

const Header = (props) => {
  const { onHeaderContactClick } = props;
  const [isMobile, setIsMobile] = React.useState(false);
  const [openBurger, setOpenBurger] = React.useState(false);

  const { t } = useTranslation('common');

  const router = useRouter();

  React.useEffect(() => {
    document.documentElement.clientWidth <= 1024 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', () => {
      document.documentElement.clientWidth <= 1024 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  React.useEffect(() => {
    return () => setOpenBurger(false);
  }, [router]);

  if (!isMobile) {
    return (
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="flex sb">
              <div className="header-top__info flex">
                <Link href="/cat/tovari-dlya-sobak" className="header-top__item">
                  Товари для собак 🐕
                </Link>
                <Link href="/cat/korm-dlya-sobak" className="header-top__item">
                  Корм для собак
                </Link>
                <Link href="/cat/suhiy-korm-dly-sobak" className="header-top__item">
                  Сухий корм для собак
                </Link>
                <Link href="/cat/vologiy-korm-dly-sobak" className="header-top__item">
                  Вологий корм для собак
                </Link>
                <div className="header-top__item flex">
                  <DeliveryIcon />
                  <strong>{t('Безкоштовна доставка')}</strong>
                </div>
              </div>
              <LangSwitcher />
            </div>
          </div>
        </div>
        <div className="header-main">
          <div className="container">
            <div className="flex sb">
              <Link href="/" className="header__logo">
                <Image src={'/logo.svg'} alt="" width={156} height={34} />
              </Link>
              <SearchInput/>
              <div className="header__actions flex">
                <CallBox onHeaderContactClick={onHeaderContactClick} />
                <CartBox />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__top">
          <div className="flex sb">
            <div className="header__item">
              <div className="header__burger" onClick={() => setOpenBurger(true)}>
                <BurgerIcon />
              </div>
              <Link href="/" className="header__logo">
                <Image src={'/logo.svg'} alt="" width={156} height={34} />
              </Link>
            </div>
            <div className="header__actions flex">
              <CallBoxMobile onHeaderContactClick={onHeaderContactClick} />
              <CartBoxMobile />
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <SearchInput/>
        </div>
      </div>
      <div
        className={classNames('header__menu', {
          '--active': openBurger,
        })}
      >
        <div className="header__menu-head">
          <span>Каталог</span>
          <div className="header__menu-cancel" onClick={() => setOpenBurger(false)}>
            <CancelIcon />
          </div>
        </div>
        <div className="header__menu-list">
          <Link href="/cat/tovari-dlya-sobak" className="header-top__item header__menu-item">
            Товари для собак 🐕
          </Link>
          <Link href="/cat/korm-dlya-sobak" className="header-top__item header__menu-item">
            Корм для собак
          </Link>
          <Link href="/cat/suhiy-korm-dly-sobak" className="header-top__item header__menu-item">
            Сухий корм для собак
          </Link>
          <Link href="/cat/vologiy-korm-dly-sobak" className="header-top__item header__menu-item">
            Мокрий корм для собак
          </Link>

          <div className="header-top__item flex header__delivery header__menu-item">
            <DeliveryIcon />
            <strong>Безкоштовна доставка від 2000 грн</strong>
          </div>
        </div>
        <LangSwitcher />
      </div>
    </header>
  );
};

export default Header;
