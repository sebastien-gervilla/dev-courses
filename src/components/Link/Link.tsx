import React, { ReactNode, HTMLAttributeAnchorTarget } from 'react';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

interface LinkProps {
    href: string,
    children: ReactNode,
    className?: string,
    showIfActive?: boolean,
    doScroll?: boolean,
    target?: HTMLAttributeAnchorTarget,
    ariaLabel?: string
}

const Link = ({ href, children, className, showIfActive = false, doScroll = false, target = '_self', ariaLabel }: LinkProps) => {

    const router = useRouter();

    const isActive = () => showIfActive && (router.asPath === href);

    return (
        <NextLink
            aria-label={ariaLabel}
            href={href}
            scroll={doScroll}
            className={'link ' + (className ?? '') + (isActive() ? ' active-path' : '')}
            target={target}
        >
            {children}
        </NextLink>
    );
};

export default Link;