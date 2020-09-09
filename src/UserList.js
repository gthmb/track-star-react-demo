import React from 'react';
import { UserListItem } from './UserListItem';

const UserList = () => {
    return (
        <div className="user-list">
            <p>This is a user list!</p>
            <ul>
                <UserListItem
                    firstName="Jonathan"
                    lastName="Greene"
                    company="Pixability"
                    status="active"
                />
                <UserListItem
                    firstName="Colleen"
                    lastName="Greene"
                    company="Children's Hosptial"
                    status="offline"
                />
                <UserListItem
                    firstName="Tyrika"
                    lastName="Greene"
                    company="Demolition Inc."
                    status="away"
                />
            </ul>
        </div>
    );
};

export default UserList;
