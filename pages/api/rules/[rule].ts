import dataBaseProvider from '../../../providers/database';
import { NextApiResponse, NextApiRequest } from 'next';

function handleQueryParam(param: string[] | string): string {
    return Array.isArray(param)
        ? param[0]
        : param;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    switch (req.method) {
        case 'GET': {
            try {
                const rule = await dataBaseProvider.getRule(handleQueryParam(req.query.rule));
    
                if (rule) {
                    res.status(200).json(rule);
                } else {
                    res.status(404).end();
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: error.message });
            }
            break;
        }
        case 'DELETE': {
            try {
                const ruleId = handleQueryParam(req.query.rule);

                try {
                    await dataBaseProvider.removeRule(ruleId);
                } catch (error) {
                    res.status(404).end();
                }

                res.status(200).end();
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        }
        default:
            res.status(405).end();
            break;
    }
}
