/* global process */
import fetch from 'isomorphic-unfetch';
import { IncomingMessage } from 'http';

import { VocabularyItem } from "../entities/Vocabulary";
import { MenuItem } from '../entities/Menu';
import { Rule } from '../entities/Rule';

enum EMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

class ApiProvider {
    static getHostFromReq(req: IncomingMessage | undefined): string {
        return req?.headers
            ? `${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}`
            : '';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async handleResponse(response: Response): Promise<any> {
        return await response.json();
    }

    static handleError(error: Error): void {
        throw new Error(error.message);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async request(url: string, method: EMethod, req?: IncomingMessage, body?: object): Promise<any> {
        if (!url) {
            throw new Error('url must be setted');
        }

        if (!process.browser && !req) {
            throw new Error('You need to pass req for requests on server-side');
        }

        const headers = {
            ...(body && {'Content-Type': 'application/json'}),
            cookie: req?.headers?.cookie,
        };

        try {
            const response = await fetch(
                `${ApiProvider.getHostFromReq(req)}${url}`,
                {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : undefined,
                }
            );

            return await ApiProvider.handleResponse(response);
        } catch (error) {
            console.log(`error url: ${ApiProvider.getHostFromReq(req)}${url}`)
            return ApiProvider.handleError(error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(url: string, req?: IncomingMessage): Promise<any> {
        return await this.request(url, EMethod.GET, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async post(url: string, body?: object, req?: IncomingMessage): Promise<any> {
        return await this.request(url, EMethod.POST, req, body);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async put(url: string, body?: object, req?: IncomingMessage): Promise<any> {
        return await this.request(url, EMethod.PUT, req, body);
    }

    async getMenu(req?: IncomingMessage): Promise<Array<MenuItem>> {
        return await this.get('/api/menu', req);
    }

    async getVocabulary(req?: IncomingMessage): Promise<Array<VocabularyItem>> {
        return await this.get('/api/vocabulary', req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async postVocabularyItem(item: VocabularyItem, req?: IncomingMessage): Promise<any> {
        return await this.post('/api/vocabulary', item, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async postRule(rule: Rule, req?: IncomingMessage): Promise<any> {
        return await this.post('/api/rules', rule, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async putRule(rule: Rule, req?: IncomingMessage): Promise<any> {
        return await this.put('/api/rules', rule, req);
    }

    async getRule(ruleHref: string, req?: IncomingMessage): Promise<Rule> {
        return await this.get(`/api/rules/${ruleHref}`, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async authUser(login: string, password: string, req?: IncomingMessage): Promise<any> {
        return await this.post('/api/auth', { login, password }, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getIsAuth(req?: IncomingMessage): Promise<boolean> {
        const res = await this.get('/api/auth', req);
        return res?.isAuth;
    }

}

const apiProvider = new ApiProvider();

export default apiProvider;
