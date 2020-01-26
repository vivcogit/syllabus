import { ReactElement } from 'react';
import { Menu } from 'evergreen-ui';

import MyMenuItem from './MyMenuItem';
import { IMenuData } from '../../types/menu';

interface IMyMenuProps {
    menu: IMenuData;
}

function MyMenu(props: IMyMenuProps): ReactElement {
    const { menu } = props;

    return (
        <Menu>
            {menu.map((menuItem, ix) => (
                <MyMenuItem item={menuItem} key={ix} />
            ))}
        </Menu>
    );
}

export default MyMenu;
