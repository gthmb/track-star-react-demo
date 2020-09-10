import React, { useContext } from 'react';
import { login } from './ApiService';
import { navigate } from '@reach/router';
import ActiveUserContext from './ActiveUserContext';

const Login = () => {
    const [username, updateUsername] = React.useState('');
    const [password, updatePassword] = React.useState('');

    const [activeUser, updateActiveUser] = useContext(ActiveUserContext);

    if (activeUser) {
        navigate('/');
    }

    return (
        <div className="login">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login(username, password)
                        .then(updateActiveUser)
                        .catch(() => updateActiveUser(false));
                }}
            >
                <label htmlFor="location">
                    Username
                    <input
                        id="username"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => updateUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => updatePassword(e.target.value)}
                    />
                </label>
                <button disabled={!username || !password}>Login</button>
            </form>
        </div>
    );
};

export default Login;
