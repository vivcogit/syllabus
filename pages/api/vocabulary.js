import dataBaseProvider from '../../providers/database';

export default async (req, res) => {
    try {
        switch (req.method) {
            case 'GET': {
                const vocabulary = await dataBaseProvider.getVocabulary();
            
                res
                    .status(200)
                    .json(vocabulary);
                break;
            }
            case 'POST': {
                const result = await dataBaseProvider.insertVocabularyItem(req.body);

                res
                    .status(200)
                    .json({ success: true, result });
                break;
            }
            case 'PUT': {
                const result = await dataBaseProvider.updateVocabularyItem(req.body);

                res
                    .status(200)
                    .json({ success: true, result });
                    
                break;
            }
            case 'DELETE': {
                const result = await dataBaseProvider.deleteVocabularyItem(req.body.id);
                res
                    .status(200)
                    .json({ success: true, result });

                break;
            }
            default:
                res.status(405).end();
                break;
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
