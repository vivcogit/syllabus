import fetch from 'isomorphic-unfetch';

function defaultGetter(item) {
    return item;
}

export function sortFabric(getter = defaultGetter, sortDirection = 1) {
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
    get = async (url, req) => {
        try {
            const response = await fetch(`${getHostFromReq(req)}${url}`);
            return await this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    post = async (url, req, body) => {
        try {
            const response = await fetch(
                `${getHostFromReq(req)}${url}`,
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );

            return await this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    handleResponse = async (response) => {
        return await response.json();
    }

    handleError = (error) => {
        console.error(error);
        throw new Error(error);
    }

    getMenu = async (req) => {
        const menu = await this.get('/api/menu', req);

        return { menu };
    }

    getVocabulary = async (req) => {
        const data = await this.get('/api/vocabulary', req);

        return {
            ...data,
            vocabulary: data.vocabulary.sort(sortFabric((item) => item.word)),
        };
    }

    postRule = async (rule, req) => {
        await this.post('/api/rules', req, rule);
    }

    getRule = async (rule, req) => {
        return await this.get(`/api/rules/${rule}`, req);
    }
}

const apiProvider = new ApiProvider();

export default apiProvider;
