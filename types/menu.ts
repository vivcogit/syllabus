export enum MenuItemType {
    Group = 'group',
    Link = 'link',
    Divider = 'divider',
};

export type MenuItem = {
    type: MenuItemType,
    items: Array<{
        title: string | undefined,
        href: string | undefined,
    }>,
    title: string | undefined,
    href: string | undefined,
};

export type MenuData = Array<MenuItem>;
