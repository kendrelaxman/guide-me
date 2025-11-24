import React from 'react';

export function Header({ onStartTour }) {
    return (
        <header className="header" id="header">
            <h1>Welcome Back</h1>
            <div className="actions">
                <button id="start-tour-btn" onClick={onStartTour}>Start Tour</button>
                <div className="profile" id="profile">JD</div>
            </div>
        </header>
    );
}
