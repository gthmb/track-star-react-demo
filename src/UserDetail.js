import React, { useState, useEffect } from 'react';
import { getUserDetail, punchUserIn, punchUserOut } from './ApiService';
import { navigate } from '@reach/router';
import TimeEntry from './TimeEntry';
import StatusIndicator from './StatusIndicator';
import LoadingIndicator from './LoadingIndicator';

const UserDetail = ({ id }) => {
    const [user, updateUser] = useState(null);
    const [isLoading, updateLoading] = useState(false);
    const [isPunching, updatePunching] = useState(false);

    useEffect(() => {
        updateLoading(true);
        getUserDetail(id)
            .then(updateUser)
            .finally(() => updateLoading(false));
    }, []);

    if (user === false) {
        navigate('/');
    }

    const handlePunchIn = () => {
        updatePunching(true);
        punchUserIn(id)
            .then(updateUser)
            .finally(() => updatePunching(false));
    };

    const handlePunchOut = () => {
        updatePunching(true);
        punchUserOut(user.activeEntry)
            .then(updateUser)
            .finally(() => updatePunching(false));
    };

    return (
        <div className="user-detail">
            {isLoading && <LoadingIndicator />}
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
                        {isPunching ? (
                            <LoadingIndicator size={30} />
                        ) : (
                            <>
                                {user.status === 'away' && (
                                    <button onClick={handlePunchIn}>Punch In</button>
                                )}
                                {user.status === 'active' && (
                                    <button className="light-grey" onClick={handlePunchOut}>
                                        Punch Out
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDetail;
