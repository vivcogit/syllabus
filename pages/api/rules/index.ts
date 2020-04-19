import dataBaseProvider from '../../../providers/database';

export default async (req, res) => {
    switch (req.method) {
        case 'POST': {
            try {
                await dataBaseProvider.insertRule(req.body);

                res.status(200)
                    .json({ success: true });
            } catch (error) {
                console.log(error.message);

                res.status(500)
                    .json({ error: error.message });
            }
            break;
        }
        case 'PUT': {
            const rule = req.body;

            try {                
                const result = await dataBaseProvider.updateRule(rule);
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
