import fetch from 'isomorphic-unfetch';

function defaultGetter(item) {
    return item;
}

function sortFabric(getter = defaultGetter, sortDirection = 1) {
    return (itemA, itemB) => {
        const [a, b] = [getter(itemA), getter(itemB)];

        if (a >= b) {
            return sortDirection * +(a > b);
        }

        return -sortDirection;
    };
}

function getHostFromReq(req = {}) {
    return req.headers
        ? `${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}`
        : '';
}

class ApiProvider {
    handleResponse = async (response) => {
        return await response.json();
    }

    handleError = (error) => {
        console.error(error);
        throw new Error(error);
    }

    request = async ({ url, body, req, method = 'GET' }) => {
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
                `${getHostFromReq(req)}${url}`,
                {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : undefined,
                }
            );

            return await this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    get = async (url, req) => {
        return await this.request({ url, req, method: 'GET'});
    }

    post = async (url, body, req) => {
        return await this.request({ url, req, body, method: 'POST'});
    }

    put = async (url, body, req) => {
        return await this.request({ url, req, body, method: 'PUT'});
    }

    getMenu = async (req) => {
        const menu = await this.get('/api/menu', req);

        return { menu };
    }

    getVocabulary = async (req) => {
        const vocabulary = await this.get('/api/vocabulary', req);

        return vocabulary.sort(sortFabric((item) => item.word));
    }

    postVocabularyItem = async (item, req) => {
        return await this.post('/api/vocabulary', item, req);
    }

    postRule = async (rule, req) => {
        return await this.post('/api/rules', rule, req);
    }

    putRule = async (rule, req) => {
        return await this.put('/api/rules', rule, req);
    }

    getRule = async (rule, req) => {
        return await this.get(`/api/rules/${rule}`, req);
    }
}

const apiProvider = new ApiProvider();

export default apiProvider;
