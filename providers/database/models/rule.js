import mongoose from 'mongoose';

const ruleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    href: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (value.indexOf(' ') >= 0) {
                throw new Error('href must be a valid path of URI');
            }
        }
    },
    content: {
        type: {
            id: String,
            cells: [],
        },
        trim: true,
    },
});

let Rule;
try {
    Rule = mongoose.model('Rule');
} catch (error) {
    Rule = mongoose.model('Rule', ruleSchema);
}

export default Rule;
