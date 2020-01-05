import Link from 'next/link';
import { Menu, Link as LinkUI, } from 'evergreen-ui';

function MyMenuGroup(props) {
    const { group, children } = props;

    return (
        <Menu.Group title={group.title}>
            {children}
        </Menu.Group>
    );
}

function MyMenuLink(props) {
    const { title, href } = props;

    return (
        <Menu.Item>
            <Link href={href}>
                <LinkUI>{title}</LinkUI>
            </Link>
        </Menu.Item>
    );
}

function MyMenuItem(props) {
    const { item = {} } = props;

    switch (item.type) {
        case 'group':
            return (
                <MyMenuGroup group={item}>
                    {item.items.map((innerItem, ix) => (
                        <MyMenuLink
                            key={ix}
                            title={innerItem.title}
                            href={innerItem.href}
                        />
                    ))}
                </MyMenuGroup>
            );
        case 'link':
            return (
                <MyMenuLink
                    title={item.title}
                    href={item.href}
                />
            );
        case 'divider':
            return (
                <Menu.Divider />
            );
        default:
            throw new Error(`Unknown menu item data: ${item}`);
    }
}

function MyMenu(props) {
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
