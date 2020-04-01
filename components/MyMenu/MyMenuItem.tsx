import { ReactElement } from 'react';

import MyMenuLink from './MyMenuLink';
import MenuDivider from './MenuDivider';
import MenuGroup from './MenuGroup';
import { MenuItemType, MenuItem } from '../../entities/Menu';

interface MyMenuItemProps {
    item: MenuItem;
}

function MyMenuItem(props: MyMenuItemProps): ReactElement {
    const { item } = props;

    switch (item.type) {
        case MenuItemType.Group:
            return (
                <MenuGroup title={item.title}>
                    {item.items.map((innerItem, ix) => (
                        <MyMenuLink
                            key={ix}
                            title={innerItem.title}
                            href={innerItem.href}
                        />
                    ))}
                </MenuGroup>
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
                <MenuDivider />
            );
        default:
            throw new Error(`Unknown menu item data: ${item}`);
    }
}

export default MyMenuItem;
