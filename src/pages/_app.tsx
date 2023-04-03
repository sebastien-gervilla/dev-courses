import { ThemeContextProvider } from '@/contexts/ThemeContext';
import type { AppContext, AppProps } from 'next/app';
import '@/styles/index.scss';
import Head from 'next/head';
import { AppWrapper } from '@/components';
import App from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <link
                    rel="shortcut icon"
                    href={'/favicon.ico'}
                />
            </Head>
            <ThemeContextProvider>
                <AppWrapper>
                    <Component {...pageProps} />
                </AppWrapper>
            </ThemeContextProvider>
        </>
    );
}

MyApp.getInitialProps = async (ctx: AppContext) => {

    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);

    return {
        ...appProps
    };
};

export default MyApp;