import React from 'react';
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";

const NotFound = () => {
    return (
        <MainLayout>
            <main className="main">
                <section className="not-found">
                    <div className="container">
                        <div className="not-found__code">404</div>
                        <div className="not-found__title">Сторінка не знайдена</div>
                        <div className="not-found__text">Можливо вона видалена або її взагалі ніколи не існувало</div>
                        <Link href="/" className="not-found__btn button --filled">
                            Перейти на робочу сторінку
                        </Link>
                    </div>
                </section>
            </main>
        </MainLayout>

    );
};

export default NotFound;