import mongoose from 'mongoose';
import { VocabularyItem } from '../../../entities/Vocabulary';

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

interface VocabularyItemModel extends VocabularyItem, mongoose.Document {
    id?: mongoose.Document['id'];
}

let Vocabulary: mongoose.Model<VocabularyItemModel>;
try {
    Vocabulary = mongoose.model('Vocabulary');
} catch (error) {
    Vocabulary = mongoose.model('Vocabulary', vocabularySchema, 'vocabulary');
}

export default Vocabulary;
