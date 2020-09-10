import React from 'react';
import { Link } from '@reach/router';
import StatusIndicator from './StatusIndicator';

export const UserListItem = ({ firstName, lastName, company, status, id }) => {
    return (
        <li>
            <Link to={`/user/${id}`}>
                <h3>
                    <span>
                        {firstName} {lastName}
                    </span>
                    <StatusIndicator status={status} />
                </h3>
                <div className="stats">
                    <p>Company: {company}</p>
                </div>
            </Link>
        </li>
    );
};
