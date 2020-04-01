import mongoose from 'mongoose';
import { ServerVocabularyItem } from '../../../types/vocabulary';

const vocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        trim: true,
    },
    translation: {
        type: String,
        required: true,
        trim: true,
    },
    example: {
        type: String,
        trim: true,
    },
});

let Vocabulary: mongoose.Model<ServerVocabularyItem>;
try {
    Vocabulary = mongoose.model('Vocabulary');
} catch (error) {
    Vocabulary = mongoose.model('Vocabulary', vocabularySchema, 'vocabulary');
}

export default Vocabulary;
