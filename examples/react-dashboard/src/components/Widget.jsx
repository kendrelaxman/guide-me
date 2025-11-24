import React from 'react';

export function Widget({ title, id, value }) {
    return (
        <div className="widget" id={id}>
            <h3>{title}</h3>
            <p className="value">{value}</p>
        </div>
    );
}
