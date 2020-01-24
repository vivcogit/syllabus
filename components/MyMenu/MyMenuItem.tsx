import { Menu } from 'evergreen-ui';

import MyMenuLink from './MyMenuLink';
import MyMenuGroup from './MyMenuGroup';

enum MyMenuItemType {
    Group = 'group',
    Link = 'link',
    Divider = 'divider',
};

export type MenuDataItemType = {
    type: MyMenuItemType,
    items: Array<{
        title: string | undefined,
        href: string | undefined,
    }>,
    title: string | undefined,
    href: string | undefined,
};

export interface MyMenuItemProps {
    item: MenuDataItemType,
};

function MyMenuItem(props: MyMenuItemProps) {
    const { item } = props;

    switch (item.type) {
        case MyMenuItemType.Group:
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
        case MyMenuItemType.Link:
            return (
                <MyMenuLink
                    title={item.title}
                    href={item.href}
                />
            );
        case MyMenuItemType.Divider:
            return (
                <Menu.Divider />
            );
        default:
            throw new Error(`Unknown menu item data: ${item}`);
    }
}

export default MyMenuItem;
