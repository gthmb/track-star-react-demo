import React from 'react';
import ReactDOM from 'react-dom';
import UserList from './UserList';
import UserDetail from './UserDetail';
import { Router, Link } from '@reach/router';

const App = () => {
    return (
        <div>
            <header>
                <Link to="/">
                    <h1>Track Star</h1>
                </Link>
                <div>Hello!</div>
            </header>
            <div className="app-content">
                <Router>
                    <UserList path="/" />
                    <UserDetail path="/user/:id" />
                </Router>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
