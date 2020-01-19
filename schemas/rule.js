import { Schema } from 'mongoose';

const ruleSchema = Schema({
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

export default ruleSchema;
