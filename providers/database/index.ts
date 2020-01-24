import url from 'url';
import mongoose from 'mongoose';

import Rule from './models/rule';
import Vocabulary from './models/vocabulary';
import User from './models/user';

class DataBaseProvider {
    constructor(dbUri) {
        if (!dbUri) {
            throw new Error('dbUri must be setted!');
        }

        mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }

    async getVocabulary() {
        return await Vocabulary.find(
            {},
            ['word', 'translation', 'example'],
            { sort: { word: 'asc' } },
        );
    }

    async insertVocabularyItem(item) {
        return await Vocabulary.create(item);
    }

    async updateVocabularyItem(item) {
        const { _id, ...data } = item;

        return await Vocabulary.replaceOne(
            { _id: new ObjectID(_id) },
            data, 
            { upsert: true },
        );
    }

    async deleteVocabularyItem(item) {
        const { _id } = item;

        return await Vocabulary.deleteOne(
            { _id: new ObjectID(_id) },
        );
    }
    
    async getRulesForMenu() {
        return await Rule.find({}, 'title href');
    }

    async getRule(ruleHref) {
        return await Rule.findOne({ href: ruleHref });
    }

    async insertRule(rule) {
        return await Rule.create(rule);
    }

    async updateRule(rule) {
        const { _id, ...data } = rule;
        
        return await Rule.replaceOne(
            { _id: new ObjectID(_id) },
            data,
            { upsert: true },
        );
    }

    async deleteRule(rule) {
        const { _id } = item;

        return await Rule.deleteOne(
            { _id: new ObjectID(_id) }
        );
    }

    async createUser(login, password) {
        return await User.create({ login, password });
    }

    async findUserByCredentials(login, password) {
        return await User.findByCredentials(login, password);
    }
}

const dataBaseProvider = new DataBaseProvider(process.env.MONGODB_URI);

export default dataBaseProvider;
