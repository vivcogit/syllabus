import url from 'url';
import { MongoClient, ObjectID } from 'mongodb';
import bcryptjs from 'bcryptjs';

class DataBaseProvider {
    cachedDb = null;
    
    constructor(dbUri) {
        if (!dbUri) {
            throw new Error('dbUri must be setted!');
        }

        this.dbUri = dbUri;
    }

    async getConnectToDatabase() {
        if (this.cachedDb) {
            return this.cachedDb;
        }
        
        const client = await MongoClient.connect(
            this.dbUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        
        const db = await client.db(url.parse(this.dbUri).pathname.substr(1));
        
        this.cachedDb = db;
        return db;
    }

    async getCollection(collection) {
        const db = await this.getConnectToDatabase();
        return await db.collection(collection);
    }

    async getVocabulary() {
        const collection = await this.getCollection('vocabulary');
        const vocabulary = await collection.find({}).toArray();

        return vocabulary;
    }

    async insertVocabularyItem(item) {
        if (!item.word) {
            throw new Error('Vocabulary item must have a word');
        }

        if (!item.translation) {
            throw new Error('Vocabulary item must have a translation');
        }

        const collection = await this.getCollection('vocabulary');
        await collection.insert(item);
    }

    async updateVocabularyItem(item) {
        const collection = await this.getCollection('vocabulary');
        try {
            const { _id, ...data } = item;

            const res = await collection.replaceOne(
                { _id: new ObjectID(_id) },
                data,
                { upsert: true },
            );
            return res.result;
        } catch (error) {
            throw error.message;
        }
    }

    async deleteVocabularyItem(item) {
        const collection = await this.getCollection('vocabulary');
        try {
            const { _id } = item;

            const res = await collection.deleteOne(
                { _id: new ObjectID(_id) }
            );

            if (!res.result.ok) {
                throw new Error(res.message);
            }

            return res.result;
        } catch (error) {
            throw error.message;            
        }
    }

    async getMenu() {
        const collection = await this.getCollection('menu');
        const menu = await collection.find({}).toArray();
        
        return menu;
    }
    
    async getRulesForMenu() {
        const collection = await this.getCollection('rules');
        const rules = await collection.find(
            {},
            { projection: { title: true, href: true } }
        ).toArray();

        return rules;
    }

    async getRule(ruleHref) {
        const collection = await this.getCollection('rules');
        const rule = await collection.findOne(
            { href: ruleHref },
        );

        return rule;
    }

    async insertRule(rule) {
        if (!rule.title) {
            throw new Error('Rule must have a title');
        }

        if (!rule.href) {
            throw new Error('Rule must have a href');
        }

        const collection = await this.getCollection('rules');
        const res = await collection.insert(rule);

        if (!res.result.ok) {
            throw new Error(res.message);
        }
    }

    async updateRule(rule) {
        const collection = await this.getCollection('rules');
        try {
            const { _id, ...data } = rule;

            const res = await collection.replaceOne(
                { _id: new ObjectID(_id) },
                data,
                { upsert: true },
            );

            if (!res.result.ok) {
                throw new Error(res.message);
            }

            return res.result;
        } catch (error) {
            throw error.message;
        }
    }

    async deleteRule(rule) {
        const collection = await this.getCollection('rule');

        try {
            const { _id } = item;

            const res = await collection.deleteOne(
                { _id: new ObjectID(_id) }
            );

            if (!res.result.ok) {
                throw new Error(res.message);
            }

            return res.result;
        } catch (error) {
            throw error.message;            
        }
    }

    async insertUser(login, password) {
        if (!login) {
            throw new Error('login must be not undefined');
        }

        if (!password) {
            throw new Error('password must be not undefined');
        }

        const pwdHash = bcryptjs.hashSync(password);

        const collection = await this.getCollection('users');
        const res = await collection.insert({
            login,
            password: pwdHash,
            tokens: [],
        });

        if (!res.result.ok) {
            throw new Error(res.message);
        }
    }
}

const dataBaseProvider = new DataBaseProvider(process.env.MONGODB_URI);

export default dataBaseProvider;
