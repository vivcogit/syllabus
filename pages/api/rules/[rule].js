import dataBaseProvider from '../../../providers/database';

export default async (req, res) => {
    switch (req.method) {
        case 'GET': {
            try {
                const rule = await dataBaseProvider.getRule(req.query.rule);
    
                if (rule) {
                    res.status(200)
                        .json(rule);
                } else {
                    res.status(404).end();
                }
            } catch (error) {
                console.log(error);
                res.status(500),json({ error: error.message });
            }
            break;
        }
        case 'DELETE': {
            try {
                const result = await dataBaseProvider.deleteRule(req.query.rule);
                res.status(200).end();
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
        default:
            res.status(405).end();
            break;
    }
}
