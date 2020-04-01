import { ReactElement } from 'react';

import MyMenuItem from './MyMenuItem';
import { MenuItem } from '../../entities/Menu';

import styles from './Menu.module.css';

interface MyMenuProps {
    menu: Array<MenuItem>;
}

function MyMenu(props: MyMenuProps): ReactElement {
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
