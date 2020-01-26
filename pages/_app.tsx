import { AppContext } from 'next/app';

import Page from '../components/Page';
import apiProvider from '../providers/api';
import { IMenuData } from '../types/menu';
import { ReactElement } from 'react';

interface IMyAppPropsRaw {
    menu: IMenuData;
    pageProps?: object;
}

interface IMyAppProps extends AppContext, IMyAppPropsRaw {}

function MyApp(props: IMyAppProps): ReactElement {
    const { menu, Component, pageProps = {} } = props;

    return (
        <Page menu={menu}>
            <Component {...pageProps} />
        </Page>
    );
}

MyApp.getInitialProps = async (context: AppContext): Promise<IMyAppPropsRaw> => {
    const { Component, ctx } = context;
    const menu = await apiProvider.getMenu(ctx.req);
    
    if (Component.getInitialProps) {
        const pageProps = await Component.getInitialProps(ctx);

        return {
            menu,
            pageProps,
        }
    }

    return { menu };
}

export default MyApp;
