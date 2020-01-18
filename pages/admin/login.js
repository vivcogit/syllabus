import { Pane, TextInputField, Button } from "evergreen-ui";
import { useState } from "react";

function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    return (
        <Pane paddingX="2em">
            <TextInputField
                label="Log In"
                name="log-in"
                value={login}
                placeholder="Input your login"
                onChange={(e) => setLogin(e.target.value)}
                />

            <TextInputField
                label="Password"
                name="password"
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button>Log In</Button>
        </Pane>
    );
}

export default LoginPage;
