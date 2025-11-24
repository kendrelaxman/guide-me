import React from 'react';

export function Sidebar() {
    return (
        <div className="sidebar" id="sidebar">
            <div className="logo">Dashboard</div>
            <nav>
                <ul>
                    <li id="nav-home">Home</li>
                    <li id="nav-analytics">Analytics</li>
                    <li id="nav-settings">Settings</li>
                </ul>
            </nav>
        </div>
    );
}
