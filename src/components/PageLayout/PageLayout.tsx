import React from 'react';
import { SeoHead, Header, Footer } from '../';
import { SeoModel } from '@/api';

interface PageLayoutProps {
    id: string,
    seo: SeoModel,
    children: JSX.Element | JSX.Element[]
}

const PageLayout = ({ id, seo, children }: PageLayoutProps) => {
    return (
        <section className='app-page' id={id}>
            <SeoHead {...seo} />

            <Header />

            <div className="main-area">
                <div className="main-content">
                    {children}
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default PageLayout;