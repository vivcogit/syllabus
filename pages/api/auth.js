import dataBaseProvider from '../../providers/database';

export default async (req, res) => {
    switch (req.method) {
        case 'POST': {
            const { login, password } = req.body;

            try {                
                const user = await dataBaseProvider.findUserByCredentials(login, password);

                if (!user) {
                    res
                        .status(404)
                        .json({ error: 'User not found or password is incorrect' })
                        .end();
                }

                res.status(200)
                    .json({ success: true });
            } catch (error) {
                console.error(error)
                res.status(500)
                    .json({ error: error.message });
            }
            break;
        }
        default:
            res.status(405).end();
            break;
    }
}
