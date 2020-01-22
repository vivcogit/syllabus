import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: (value) => {
            if (!value || value.length < 6) {
                throw new Error('Invalid password');
            }
        }
    },
    tokens: {
        type: [],
        default: [],
    },
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token, stamp: new Date().getTime(), });

    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({ login });
    
    if (!user) {
        return null;
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
        return null;
    }
    
    return user;
}

let User;
try {
    User = mongoose.model('User');
} catch (error) {
    User = mongoose.model('User', userSchema);
}

export default User;
