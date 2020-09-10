import React, { useState, useEffect } from 'react';
import { getUserDetail } from './ApiService';
import { navigate } from '@reach/router';

const UserDetail = ({ id }) => {
    const [user, updateUser] = useState(null);

    useEffect(() => {
        getUserDetail(id).then(updateUser);
    }, []);

    if (user === false) {
        navigate('/');
    }

    return <div className="user-detail">{user && <pre>{JSON.stringify(user, null, 4)}</pre>}</div>;
};

export default UserDetail;
