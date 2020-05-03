import { NowRequest, NowResponse } from '@now/node';
import { setCookie, parseCookies } from 'nookies';

import dataBaseProvider from '../../providers/database';

export default async (req: NowRequest, res: NowResponse): Promise<NowResponse> => {
    switch (req.method) {
        case 'GET': {
            const cookies = parseCookies({ req });
            const token = cookies['auth_token'];

            const isAuth = await dataBaseProvider.checkUserToken(token);

            return res.status(200).json({ success: true, isAuth });
        }
        case 'POST': {
            const { login, password } = req.body;

            try {
                const user = await dataBaseProvider.findUserByCredentials(login, password);

                if (!user) {
                    return res
                        .status(404)
                        .json({ error: 'User not found or password is incorrect' });
                }

                const token = await user.generateAuthToken();

                setCookie(
                    { res },
                    'auth_token',
                    token,
                    {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    }
                );

                return res.status(200)
                    .json({ success: true });
            } catch (error) {
                console.error(error)
                return res.status(500)
                    .json({ error: error.message });
            }
        }
        default:
            return res.status(405);
    }
}
