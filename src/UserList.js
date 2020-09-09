import React, { useEffect, useState } from 'react';
import { UserListItem } from './UserListItem';
import { getUsers } from './ApiService';

const UserList = () => {
    const [users, updateUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(updateUsers)
            .catch(() => {
                updateUsers([]);
            });
    }, []);

    return (
        <div className="user-list">
            <p>This is a user list!</p>
            <ul>
                {users.map((user) => (
                    <UserListItem key={user.id} {...user} />
                ))}
            </ul>
        </div>
    );
};

export default UserList;
