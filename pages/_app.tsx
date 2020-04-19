import { AppContext } from 'next/app';

import Page from '../components/Page';
import apiProvider from '../providers/api';
import { ReactElement } from 'react';
import { MenuItem } from '../entities/Menu';

interface MyAppPropsRaw {
    menu: Array<MenuItem>;
    pageProps?: object;
    isAuth: boolean;
}

interface MyAppProps extends AppContext, MyAppPropsRaw {}

function MyApp(props: MyAppProps): ReactElement {
    const { menu, Component, pageProps = {} } = props;

    return (
        <Page menu={menu}>
            <Component {...pageProps} />
        </Page>
    );
}

MyApp.getInitialProps = async (context: AppContext): Promise<MyAppPropsRaw> => {
    const { Component, ctx } = context;
    // const menu = await apiProvider.getMenu(ctx.req);
    const isAuth = await apiProvider.getIsAuth(ctx.req);
    
    if (Component.getInitialProps) {
        const pageProps = await Component.getInitialProps(ctx);

        return {
            menu: null,
            isAuth,
            pageProps,
        }
    }

    return { menu: null, isAuth };
}

export default MyApp;
