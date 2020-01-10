import dataBaseProvider from '../../providers/database';

export default async (req, res) => {
    try {
        switch (req.method) {
            case 'GET': {
                const vocabulary = await dataBaseProvider.getVocabulary();
            
                res
                    .status(200)
                    .json({ vocabulary, title: 'Vocabulary', });
                break;
            }
            case 'POST': {
                const result = await dataBaseProvider.insertVocabularyItem();
                res
                    .status(200)
                    .json({ success: true, result });
                break;
            }
            case 'PUT': {
                const result = await dataBaseProvider.updateVocabularyItem();
                res
                    .status(200)
                    .json({ success: true, result });
                    
                break;
            }
            case 'DELETE': {
                const result = await dataBaseProvider.deleteVocabularyItem();
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
