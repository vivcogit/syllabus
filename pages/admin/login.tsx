import { Pane, TextInputField, Button } from "evergreen-ui";
import { useState, useCallback, ReactElement } from "react";

import apiProvider from "../../providers/api";

function LoginPage(): ReactElement {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    const onLogin = useCallback(async () => {
        await apiProvider.authUser(login, password);
    }, [login, password]);

    return (
        <Pane paddingX="2em">
            <TextInputField
                label="Log In"
                name="log-in"
                value={login}
                placeholder="Input your login"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLogin(e.target.value)}
                />

            <TextInputField
                label="Password"
                name="password"
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
            />

            <Button
                onClick={onLogin}
            >
                Log In
            </Button>
        </Pane>
    );
}

export default LoginPage;
