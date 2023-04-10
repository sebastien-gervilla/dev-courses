import React, { Fragment } from 'react';
import { Link } from '@/components';
import { HiChevronRight } from 'react-icons/hi';

interface BreadcrumbProps {
    links: Array<{
        title: string,
        href: string
    }>
}

const Breadcrumb = ({ links }: BreadcrumbProps) => {

    const displayLinks = () =>
        links.map((link, index) => (
            <Fragment key={link.href + '-' + index}>
                <HiChevronRight />
                <Link href={link.href}>
                    {link.title}
                </Link>
            </Fragment>
        ))

    return (
        <div className='breadcrumb'>
            <Link href='/'>
                Accueil
            </Link>
            {displayLinks()}
        </div>
    );
};

export default Breadcrumb;