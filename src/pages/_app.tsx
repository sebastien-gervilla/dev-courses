import { ThemeContextProvider } from '@/contexts/ThemeContext';
import type { AppContext, AppProps } from 'next/app';
import '@/styles/index.scss';
import Head from 'next/head';
import { AppWrapper } from '@/components';
import App from 'next/app';
import { UserContextProvider } from '@/contexts/AuthContext';
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
            <UserContextProvider initialUser={user}>
                <ThemeContextProvider>
                    <AppWrapper>
                        <Component {...pageProps} />
                    </AppWrapper>
                </ThemeContextProvider>
            </UserContextProvider>
        </>
    );
}

MyApp.getInitialProps = async (ctx: AppContext) => {

    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);

    const userRes = await Request.get('/user/auth', {
        headers: {
            'Content-Type': 'application/json',
            Cookie: ctx.ctx.req?.headers.cookie || ''
        }
    });

    return {
        ...appProps,
        user: userRes.data
    };
};

export default MyApp;