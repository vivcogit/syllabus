import dataBaseProvider from '../../providers/database';

const generateMenu = (rules) => [
    {
        type: 'group',
        title: 'Basic',
        items: [
            {
                title: 'Vocabulary',
                href: '/vocabulary',
                type: 'link',
            }
        ],
    },
    {
        type: 'divider',
    },
    {
        type: 'group',
        title: 'Rules',
        items: rules.map(({ title, href }) => ({
            title,
            href: `/rules/${href}`,
            type: 'link',
        })),
    },
];

export default async (req, res) => {
    const rules = await dataBaseProvider.getRulesForMenu();

    res.status(200).json(generateMenu(rules));
}
