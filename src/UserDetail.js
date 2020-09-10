import React, { useState, useEffect } from 'react';
import { getUserDetail, punchUserIn, punchUserOut } from './ApiService';
import { navigate } from '@reach/router';
import TimeEntry from './TimeEntry';
import StatusIndicator from './StatusIndicator';

const UserDetail = ({ id }) => {
    const [user, updateUser] = useState(null);

    useEffect(() => {
        getUserDetail(id).then(updateUser);
    }, []);

    if (user === false) {
        navigate('/');
    }

    const handlePunchIn = () => {
        punchUserIn(id).then(updateUser);
    };

    const handlePunchOut = () => {
        punchUserOut(user.activeEntry).then(updateUser);
    };

    return (
        <div className="user-detail">
            {user && (
                <>
                    <div className="user-detail-header">
                        <h1>
                            {user.firstName} {user.lastName}
                        </h1>
                        <p>{user.company}</p>
                    </div>
                    <ul>
                        {user['time-entries'].length > 0 ? (
                            user['time-entries'].map((entry) => (
                                <TimeEntry key={entry.id} {...entry} />
                            ))
                        ) : (
                            <li>No Time Entries</li>
                        )}
                    </ul>
                    <div className="user-actions">
                        <StatusIndicator status={user.status} />
                        {user.status === 'away' && (
                            <button onClick={handlePunchIn}>Punch In</button>
                        )}
                        {user.status === 'active' && (
                            <button className="light-grey" onClick={handlePunchOut}>
                                Punch Out
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDetail;
