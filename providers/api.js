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

class ApiProvider {
    baseUrl = '';

    constructor(baseUrl) {
        console.log(baseUrl);
        this.baseUrl = baseUrl;
    }

    get = async (url) => {
        try {
            const response = await fetch(`${this.baseUrl}${url}`);
            return await this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    post = async (url, body) => {
        try {
            const response = await fetch(
                `${this.baseUrl}${url}`,
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

    getMenu = async () => {
        const menu = await this.get('/api/menu');

        return { menu };
    }

    getVocabulary = async () => {
        const data = await this.get('/api/vocabulary');

        return {
            ...data,
            vocabulary: data.vocabulary.sort(sortFabric((item) => item.word)),
        };
    }

    postRule = async (rule) => {
        await this.post('/api/rules', rule);
    }

    getRule = async (rule) => {
        return await this.get(`/api/rules/${rule}`);
    }
}

const apiProvider = new ApiProvider(process.env.API_URI);

export default apiProvider;
