import { Entity } from "../Entity";

export enum MenuItemType {
  Group = 'group',
  Link = 'link',
  Divider = 'divider',
}

export interface MenuItem extends Entity {
  type: MenuItemType;
  items: Array<{
    title: string | undefined;
    href: string | undefined;
  }>;
  title: string | undefined;
  href: string | undefined;
  id?: string;
}
