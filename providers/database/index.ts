/* global process */
import mongoose from 'mongoose';

import Vocabulary from './models/vocabulary';
import User from './models/user';
import RuleModel from './models/rule';
import { ServerUser } from '../../entities/User';
import { VocabularyItem } from '../../entities/Vocabulary';
import { Rule } from '../../entities/Rule';

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

    async getVocabulary(): Promise<VocabularyItem[]> {
        const res = await Vocabulary.find(
            {},
            ['word', 'translation', 'example'],
            { sort: { word: 'asc' } },
        );

        return res;
    }

    async insertVocabularyItem(item: VocabularyItem): Promise<VocabularyItem> {
        return await Vocabulary.create(item);
    }

    async updateVocabularyItem(item: VocabularyItem): Promise<void> {
        const { id, ...data } = item;

        await Vocabulary.replaceOne(
            { _id: new mongoose.Types.ObjectId(id) },
            data,
        );
    }

    async deleteVocabularyItem(item: VocabularyItem): Promise<void> {
        const { id } = item;

        await Vocabulary.deleteOne(
            { _id: new mongoose.Types.ObjectId(id) },
        );
    }
    
    async getRulesForMenu(): Promise<Array<Rule>> {
        return await RuleModel.find({}, 'title href');
    }

    async getRule(ruleId: string): Promise<Rule> {
        return await RuleModel.findOne({ href: ruleId });
    }

    async insertRule(rule: Rule): Promise<void> {
        await RuleModel.create(rule);
    }

    async updateRule(rule: Rule): Promise<void> {
        const { id, ...data } = rule;
        
        await RuleModel.replaceOne(
            { _id: new mongoose.Types.ObjectId(id) },
            data,
        );
    }

    async removeRule(ruleId: string): Promise<any> {
        const rule = await RuleModel.findOne({ href: ruleId });

        if (!rule) {
            throw new Error('Rule not found');
        }

        await rule.remove();
    }

    async createUser(login: string, password: string): Promise<ServerUser> {
        return await User.create({ login, password });
    }

    async findUserByCredentials(login: string, password: string): Promise<ServerUser> {
        return await User.findByCredentials(login, password);
    }

    async findUserByToken(token: string): Promise<ServerUser> {
        return await User.findByToken(token);
    }

    async checkUserToken(token: string): Promise<boolean> {
        return await User.checkToken(token);
    }
}

const dataBaseProvider = new DataBaseProvider(process.env.MONGODB_URI);

export default dataBaseProvider;
