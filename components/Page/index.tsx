import { ReactElement } from 'react';

import MyMenu from '../MyMenu';
import { IMenuData } from '../../types/menu';

import styles from './page.module.css';

interface IPageProps {
    children: React.ReactNode;
    menu: IMenuData;
}

function Page(props: IPageProps): ReactElement {
    const { children, menu } = props;
    
    return (
        <div className={styles.page}>
            <div className={styles.pageMenu}>
                <MyMenu menu={menu} />
            </div>

            {children}
        </div>
    );
}

export default Page;