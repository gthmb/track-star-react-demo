import React from 'react';
import StatusIndicator from './StatusIndicator';

export const UserListItem = ({ firstName, lastName, company, status }) => {
    return (
        <li>
                <h3>
                    <span>
                        {firstName} {lastName}
                    </span>
                    <StatusIndicator status={status} />
                </h3>
                <div className="stats">
                    <p>Company: {company}</p>
                </div>
        </li>
    );
};
