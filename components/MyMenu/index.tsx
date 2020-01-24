import { Menu } from 'evergreen-ui';

import MyMenuItem, { MenuDataItemType } from './MyMenuItem';

export type MenuDataType = Array<MenuDataItemType>;

export interface MyMenuProps {
    menu: MenuDataType,
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
