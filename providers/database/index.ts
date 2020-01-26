/* global process */
import mongoose from 'mongoose';

import Vocabulary from './models/vocabulary';
import User from './models/user';
import { IVocabularyDocuments, IVocabularyItem, IVocabularyItemDocument } from '../../types/vocabulary';
import { IRuleDocument, IShortRule, IRule } from '../../types/rule';
import Rule from './models/rule';
import { IUserDocument } from '../../types/user';

class DataBaseProvider {
    constructor(dbUri: string) {
        if (!dbUri) {
            throw new Error('dbUri must be setted!');
        }

        mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }

    async getVocabulary(): Promise<IVocabularyDocuments> {
        return await Vocabulary.find(
            {},
            ['word', 'translation', 'example'],
            { sort: { word: 'asc' } },
        );
    }

    async insertVocabularyItem(item: IVocabularyItem): Promise<IVocabularyItemDocument> {
        return await Vocabulary.create(item);
    }

    async updateVocabularyItem(item: IVocabularyItemDocument) {
        const { _id, ...data } = item;

        return await Vocabulary.replaceOne(
            { _id: new mongoose.Types.ObjectId(_id) },
            data,
        );
    }

    async deleteVocabularyItem(item: IVocabularyItemDocument) {
        const { _id } = item;

        return await Vocabulary.deleteOne(
            { _id: new mongoose.Types.ObjectId(_id) },
        );
    }
    
    async getRulesForMenu(): Promise<Array<IShortRule>> {
        return await Rule.find({}, 'title href');
    }

    async getRule(ruleHref: string): Promise<IRuleDocument> {
        return await Rule.findOne({ href: ruleHref });
    }

    async insertRule(rule: IRule): Promise<IRuleDocument> {
        return await Rule.create(rule);
    }

    async updateRule(rule: IRule) {
        const { _id, ...data } = rule;
        
        return await Rule.replaceOne(
            { _id: new mongoose.Types.ObjectId(_id) },
            data,
        );
    }

    async deleteRule(rule: IRule) {
        const { _id } = rule;

        return await Rule.deleteOne(
            { _id: new mongoose.Types.ObjectId(_id) }
        );
    }

    async createUser(login: string, password: string): Promise<IUserDocument> {
        return await User.create({ login, password });
    }

    async findUserByCredentials(login: string, password: string): Promise<IUserDocument> {
        return await User.findByCredentials(login, password);
    }
}

const dataBaseProvider = new DataBaseProvider(process.env.MONGODB_URI);

export default dataBaseProvider;
