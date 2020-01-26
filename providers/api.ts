/* global process */
import fetch from 'isomorphic-unfetch';
import { IncomingMessage } from 'http';
import { IVocabularyItem, IVocabulary } from '../types/vocabulary';
import { IRule } from '../types/rule';
import { IMenuData } from '../types/menu';

enum EMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

class ApiProvider {
    static getHostFromReq = (req: IncomingMessage | undefined): string => {
        return req?.headers
            ? `${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}`
            : '';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static handleResponse = async (response: Response): Promise<any> => {
        return await response.json();
    }

    static handleError = (error: Error): void => {
        console.error(error);
        throw new Error(error.message);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request = async (url: string, method: EMethod, req?: IncomingMessage, body?: object): Promise<any> => {
        if (!url) {
            throw new Error('url must be setted');
        }

        if (!process.browser && !req) {
            throw new Error('You need to pass req for requests on server-side');
        }

        const headers = body
            ? { 'Content-Type': 'application/json' }
            : undefined;

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
            return ApiProvider.handleError(error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get = async (url: string, req?: IncomingMessage): Promise<any> => {
        return await this.request(url, EMethod.GET, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post = async (url: string, body?: object, req?: IncomingMessage): Promise<any> => {
        return await this.request(url, EMethod.POST, req, body);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    put = async (url: string, body?: object, req?: IncomingMessage): Promise<any> => {
        return await this.request(url, EMethod.PUT, req, body);
    }

    getMenu = async (req?: IncomingMessage): Promise<IMenuData> => {
        return await this.get('/api/menu', req);
    }

    getVocabulary = async (req?: IncomingMessage): Promise<IVocabulary> => {
        return await this.get('/api/vocabulary', req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postVocabularyItem = async (item: IVocabularyItem, req?: IncomingMessage): Promise<any> => {
        return await this.post('/api/vocabulary', item, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postRule = async (rule: IRule, req?: IncomingMessage): Promise<any> => {
        return await this.post('/api/rules', rule, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    putRule = async (rule: IRule, req?: IncomingMessage): Promise<any> => {
        return await this.put('/api/rules', rule, req);
    }

    getRule = async (ruleHref: string, req?: IncomingMessage): Promise<IRule> => {
        return await this.get(`/api/rules/${ruleHref}`, req);
    }

    authUser = async (login: string, password: string, req?: IncomingMessage) => {
        return await this.post('/api/auth', { login, password }, req);
    }
}

const apiProvider = new ApiProvider();

export default apiProvider;
