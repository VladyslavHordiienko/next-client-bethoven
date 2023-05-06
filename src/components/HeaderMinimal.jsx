import React from 'react';
import Image from "next/image";
import Link from "next/link";
import CallBox from "./CallBox";

const HeaderMinimal = (props) => {
    const {onHeaderContactClick} = props
    return (
        <header className="header header-minimal">
            <div className="container">
                <Link href="/" className="header__logo">
                    <Image
                        src={"/logo.svg"}
                        alt=""
                        width={156}
                        height={34}
                    />
                </Link>
                <CallBox onHeaderContactClick={onHeaderContactClick}/>
            </div>
        </header>
    );
};

export default HeaderMinimal;