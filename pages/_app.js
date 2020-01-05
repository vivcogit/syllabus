import App from 'next/app';

import Page from '../components/page';
import apiProvider from '../providers/api';

class MyApp extends App {
    static async getInitialProps(context) {
        const { Component, ctx } = context;

        const menuData = await apiProvider.getMenu();
        
        if (Component.getInitialProps) {
            const pageProps = await Component.getInitialProps(ctx);

            return {
                ...menuData,
                pageProps,
            }
        }

        return { ...menuData, pageProps: {} };
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
