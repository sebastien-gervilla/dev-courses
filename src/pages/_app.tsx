import { ThemeContextProvider } from '@/contexts/ThemeContext';
import type { AppContext, AppProps } from 'next/app';
import '@/styles/index.scss';
import Head from 'next/head';
import { AppWrapper } from '@/components';
import App from 'next/app';
import UserContext from '@/contexts/AuthContext';
import { Request, UserModel } from '@/api';

interface MyAppProps extends AppProps {
    user: UserModel | null
}

const MyApp = ({ Component, pageProps, user }: MyAppProps) => {
    return (
        <>
            <Head>
                <link
                    rel="shortcut icon"
                    href={'/favicon.ico'}
                />
            </Head>
            <UserContext.Provider value={{user, refresh: () => {}}}>
                <ThemeContextProvider>
                    <AppWrapper>
                        <Component {...pageProps} />
                    </AppWrapper>
                </ThemeContextProvider>
            </UserContext.Provider>
        </>
    );
}

MyApp.getInitialProps = async (ctx: AppContext) => {

    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);

    const userRes = await Request.get('/user/auth');

    return {
        ...appProps,
        user: userRes.data
    };
};

export default MyApp;