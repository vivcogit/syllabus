import { setCookie } from 'nookies';

import dataBaseProvider from '../../providers/database';

export default async (req, res) => {
    switch (req.method) {
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
            return res.status(405).end();
    }
}
