import mongoose from 'mongoose';

const vocabularySchema = mongoose.Schema({
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

let Vocabulary;
try {
    Vocabulary = mongoose.model('Vocabulary');
} catch (error) {
    Vocabulary = mongoose.model('Vocabulary', vocabularySchema, 'vocabulary');
}

export default Vocabulary;