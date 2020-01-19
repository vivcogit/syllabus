import { Schema } from 'mongoose';

const userSchema = Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: {
        type: [String],
        default: [],
    },
});

export default userSchema;
