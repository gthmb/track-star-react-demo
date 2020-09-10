import React from 'react';
import { formatDistance, format } from 'date-fns';

const formatDate = (date) => format(date, 'MMM do h:mm a');

const TimeEntry = ({ start, end }) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    const elapsed = formatDistance(endDate, startDate);

    return (
        <li>
            <div>
                {formatDate(startDate)} - {end ? formatDate(endDate) : 'Present'} ({elapsed})
            </div>
        </li>
    );
};

export default TimeEntry;
