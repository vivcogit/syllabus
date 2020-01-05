import dataBaseProvider from '../../providers/database';

export default async (req, res) => {
    const vocabulary = await dataBaseProvider.getVocabulary();

    res
        .status(200)
        .json({ vocabulary, title: 'Vocabulary', });
}
