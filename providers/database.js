import url from 'url';
import { MongoClient } from 'mongodb';

class DataBaseProvider {
    cachedDb = null;
    
    constructor(dbUri) {
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

    async getMenu() {
        const collection = await this.getCollection('menu');
        const menu = await collection.find({}).toArray();

        return menu;
    }

    async insertRule(rule) {
        if (!rule.title) {
            throw new Error('Rule must have a title');
        }

        if (!rule.href) {
            throw new Error('Rule must have a href');
        }

        const collection = await this.getCollection('rules');
        await collection.insert(rule);
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
    // async saveVocabulary(vocabulary) {
    //     try {
    //         const collection = await this.getCollection('vocabulary');
    //         await collection.insertMany(vocabulary);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // async saveMenu(data) {
    //     try {
    //         const collection = await this.getCollection('menu');
    //         await collection.insertMany(data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

const dataBaseProvider = new DataBaseProvider(process.env.MONGODB_URI);

export default dataBaseProvider;
