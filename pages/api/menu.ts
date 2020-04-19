import dataBaseProvider from '../../providers/database';
import { Rule } from '../../entities/Rule';
import { MenuItem, MenuItemType } from '../../entities/Menu';

const generateMenu = (rules: Rule[]): MenuItem[] => [
    {
        type: MenuItemType.Group,
        title: 'Basic',
        items: [
            {
                title: 'Vocabulary',
                href: '/vocabulary',
            }
        ],
    },
    {
        type: MenuItemType.Divider,
    },
    {
        type: MenuItemType.Group,
        title: 'Rules',
        items: rules.map(({ title, href }) => ({
            title,
            href: `/rules/${href}`,
        })),
    },
];

export default async (req, res): Promise<void> => {
    const rules = await dataBaseProvider.getRulesForMenu();
    res.status(200).json(generateMenu(rules));
}
