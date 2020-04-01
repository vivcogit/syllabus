import mongoose from 'mongoose';

import { ServerRule } from '../../../entities/Rule';

const ruleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    href: {
        type: String,
        required: true,
        trim: true,
        validate: (value: string): boolean => {
            if (value.indexOf(' ') >= 0) {
                throw new Error('href must be a valid path of URI');
            }

            return true;
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

let model: mongoose.Model<ServerRule>;
try {
    model = mongoose.model('Rule');
} catch (error) {
    model = mongoose.model('Rule', ruleSchema);
}

export default model;
