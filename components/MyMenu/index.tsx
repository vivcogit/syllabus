import { ReactElement } from 'react';

import MyMenuItem from './MyMenuItem';
import { IMenuData } from '../../types/menu';

import styles from './Menu.module.css';

interface IMyMenuProps {
    menu: IMenuData;
}

function MyMenu(props: IMyMenuProps): ReactElement {
    const { menu } = props;

    return (
        <nav className={styles.menu}>
            {menu.map((menuItem, ix) => (
                <MyMenuItem item={menuItem} key={ix} />
            ))}
        </nav>
    );
}

export default MyMenu;
