import React from 'react';

export const UserListItem = (props) => {
    return (
        <li>
            <h3>
                {props.firstName} {props.lastName}
            </h3>
            <div className="stats">
                <p>Company: {props.company}</p>
                <p>Status: {props.status}</p>
            </div>
        </li>
    );
};
