export enum MenuItemType {
    Group = 'group',
    Link = 'link',
    Divider = 'divider',
}

interface IMenuItemData {
    type: MenuItemType;
    items: Array<{
        title: string | undefined;
        href: string | undefined;
    }>;
    title: string | undefined;
    href: string | undefined;
}

export interface IMenuItem extends IMenuItemData {
    id?: string;
}

export interface IMenuItemDocument extends IMenuItemData, Document {} 

export type IMenuData = Array<IMenuItem>;
