import url from 'url';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';

import ruleSchema from '../schemas/rule';
import vocabularySchema from '../schemas/vocabulary';
import userSchema from '../schemas/user';

class DataBaseProvider {
    constructor(dbUri) {
        if (!dbUri) {
            throw new Error('dbUri must be setted!');
        }

        mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    getModel(name, schema, collection) {
        let model;
        try {
            model = mongoose.model(name);
        } catch (error) {
            model = mongoose.model(name, schema, collection);
        }

        return model;
    }

    get Rules() {
        return this.getModel('rule', ruleSchema);
    }
    
    get Vocabulary() {
        return this.getModel('vocabulary', vocabularySchema, 'vocabulary');

    }

    get Users() {
        return this.getModel('user', userSchema);
    }

    async getVocabulary() {
        return await this.Vocabulary.find();
    }

    async insertVocabularyItem(item) {
        return await this.Vocabulary.create(item);
    }

    async updateVocabularyItem(item) {
        const { _id, ...data } = item;

        return await this.Vocabulary.replaceOne(
            { _id: new ObjectID(_id) },
            data, 
            { upsert: true },
        );
    }

    async deleteVocabularyItem(item) {
        const { _id } = item;

        return await this.Vocabulary.deleteOne(
            { _id: new ObjectID(_id) },
        );
    }
    
    async getRulesForMenu() {
        return await this.Rules.find({}, 'title href');
    }

    async getRule(ruleHref) {
        return await this.Rules.findOne({ href: ruleHref });
    }

    async insertRule(rule) {
        return await this.Rules.create(rule);
    }

    async updateRule(rule) {
        const { _id, ...data } = rule;
        
        return await this.Rules.replaceOne(
            { _id: new ObjectID(_id) },
            data,
            { upsert: true },
        );
    }

    async deleteRule(rule) {
        const { _id } = item;

        return await this.Rules.deleteOne(
            { _id: new ObjectID(_id) }
        );
    }

    async insertUser(login, password) {
        const pwdHash = bcryptjs.hashSync(password);

        return await this.Users.create({ login, password: pwdHash });
    }
}

const dataBaseProvider = new DataBaseProvider(process.env.MONGODB_URI);

export default dataBaseProvider;
