import { ReactElement } from 'react';

import MyMenu from '../MyMenu';

import styles from './page.module.css';
import { MenuItem } from '../../entities/Menu';

interface PageProps {
    children: React.ReactNode;
    menu: Array<MenuItem>;
}

function Page(props: PageProps): ReactElement {
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