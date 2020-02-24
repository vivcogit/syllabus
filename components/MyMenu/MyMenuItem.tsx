import { ReactElement } from 'react';

import MyMenuLink from './MyMenuLink';
import MenuDivider from './MenuDivider';
import { IMenuItem, MenuItemType } from '../../types/menu';
import MenuGroup from './MenuGroup';

interface IMyMenuItemProps {
    item: IMenuItem;
}

function MyMenuItem(props: IMyMenuItemProps): ReactElement {
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
