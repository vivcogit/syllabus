import { AppContext } from 'next/app';

import Page from '../components/Page';
import apiProvider from '../providers/api';
import { MenuData } from '../types/menu';

interface MyAppProps extends AppContext {
    menu: MenuData,
    pageProps: any,
};

function MyApp(props: MyAppProps) {
    const { menu, Component, pageProps } = props;

    return (
        <Page menu={menu}>
            <Component {...pageProps} />
        </Page>
    );
}

MyApp.getInitialProps = async (context: AppContext) => {
    const { Component, ctx } = context;
    const menu = await apiProvider.getMenu(ctx.req);
    
    if (Component.getInitialProps) {
        const pageProps = await Component.getInitialProps(ctx);

        return {
            menu,
            pageProps,
        }
    }

    return { menu, pageProps: {} };
}

export default MyApp;
