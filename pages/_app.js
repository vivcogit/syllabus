import App from 'next/app';

import Page from '../components/page';
import apiProvider from '../providers/api';

class MyApp extends App {
    static async getInitialProps(context) {
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

    render() {
        const { menu, Component, pageProps } = this.props;

        return (
            <Page menu={menu}>
                <Component {...pageProps} />
            </Page>
        );
    }
}

export default MyApp;
