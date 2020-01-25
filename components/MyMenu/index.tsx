import { Menu } from 'evergreen-ui';

import MyMenuItem from './MyMenuItem';
import { MenuData } from '../../types/menu';

interface MyMenuProps {
    menu: MenuData,
};

function MyMenu(props: MyMenuProps) {
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
