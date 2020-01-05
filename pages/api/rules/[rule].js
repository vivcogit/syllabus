import dataBaseProvider from '../../../providers/database';

export default async (req, res) => {
    switch (req.method) {
        case 'GET': {
            const rule = await dataBaseProvider.getRule(req.query.rule);

            if (rule) {
                res.status(200)
                    .json(rule);
            } else {
                res.status(404);
            }
            break;
        }
        default:
            res.status(405).end();
            break;
    }
}
