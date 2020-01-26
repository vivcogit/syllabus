import mongoose from 'mongoose';

import { IRuleDocument } from '../../../types/rule';

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

let Rule: mongoose.Model<IRuleDocument>;
try {
    Rule = mongoose.model('Rule');
} catch (error) {
    Rule = mongoose.model('Rule', ruleSchema);
}

export default Rule;
