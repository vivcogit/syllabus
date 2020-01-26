import { ReactElement } from 'react';
import { Menu } from 'evergreen-ui';

import MyMenuLink from './MyMenuLink';
import MyMenuGroup from './MyMenuGroup';
import { IMenuItem, MenuItemType } from '../../types/menu';

interface IMyMenuItemProps {
    item: IMenuItem;
}

function MyMenuItem(props: IMyMenuItemProps): ReactElement {
    const { item } = props;

    switch (item.type) {
        case MenuItemType.Group:
            return (
                <MyMenuGroup title={item.title}>
                    {item.items.map((innerItem, ix) => (
                        <MyMenuLink
                            key={ix}
                            title={innerItem.title}
                            href={innerItem.href}
                        />
                    ))}
                </MyMenuGroup>
            );
        case MenuItemType.Link:
            return (
                <MyMenuLink
                    title={item.title}
                    href={item.href}
                />
            );
        case MenuItemType.Divider:
            return (
                <Menu.Divider />
            );
        default:
            throw new Error(`Unknown menu item data: ${item}`);
    }
}

export default MyMenuItem;
