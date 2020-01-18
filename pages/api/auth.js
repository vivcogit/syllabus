import dataBaseProvider from '../../../providers/database';

export default async (req, res) => {
    switch (req.method) {
        case 'PUT': {
            const { login, password } = req.body;

            try {                
                // const result = await dataBaseProvider.updateRule(rule);

                res.status(200)
                    .json({ success: true, result });
            } catch (error) {
                res.status(500)
                    .json({ error: error.message });
            }
            break;
        }
        default:
            res.status(405).end();
            break;
    }
}
