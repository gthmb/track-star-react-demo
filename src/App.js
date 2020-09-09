import React from "react";
import ReactDOM from "react-dom";
import UserList from './UserList';

const App = () => {

    return (
        <div>
            <header>
                <h1>Track Star</h1>
                <div>Hello!</div>
            </header>
            <div className="app-content">
                <UserList />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
