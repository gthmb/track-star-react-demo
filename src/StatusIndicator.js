import React from 'react';

const StatusIndicator = ({ status }) => (
    <div title={status} className={`status-indicator ${status}`}></div>
);

export default StatusIndicator;
