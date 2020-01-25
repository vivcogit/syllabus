import { AppContext } from 'next/app';

import Page from '../components/Page';
import apiProvider from '../providers/api';

interface MyAppProps extends AppContext {
    menu: any,
};

function MyApp(props) {
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
