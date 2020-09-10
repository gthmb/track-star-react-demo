import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import UserList from './UserList';
import UserDetail from './UserDetail';
import { Router, Link, navigate } from '@reach/router';
import { getActiveUser, login, logout } from './ApiService';
import Login from './Login';
import ActiveUserContext from './ActiveUserContext';

window.login = login;
window.logout = logout;
window.getActiveUser = getActiveUser;

const App = () => {
    const activeUserHook = React.useState(null);
    const activeUser = activeUserHook[0];
    const updateActiveUser = activeUserHook[1];

    useEffect(() => {
        getActiveUser().then(updateActiveUser);
    }, []);

    const checkForActiveUser = () => {
        if (activeUser === false) {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        logout();
        updateActiveUser(false);
    };

    checkForActiveUser();

    return (
        <ActiveUserContext.Provider value={activeUserHook}>
            <div>
                <header>
                    <Link to={activeUser ? '/' : '/login'} onClick={checkForActiveUser}>
                        <h1>Track Star</h1>
                    </Link>
                    {activeUser ? (
                        <div>
                            Hello, {activeUser.firstName} {activeUser.lastName}!
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div>Hello!</div>
                    )}
                </header>
                <div className="app-content">
                    <Router>
                        <Login path="/login" />
                        {activeUser && (
                            <>
                                <UserList path="/" />
                                <UserDetail path="/user/:id" />
                            </>
                        )}
                    </Router>
                </div>
            </div>
        </ActiveUserContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
