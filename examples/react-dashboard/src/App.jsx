import React, { useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Widget } from './components/Widget';
import './App.css';
import { GuideMe } from '../../../packages/guideme/index.js';
import '../../../packages/guideme/style.css';

function App() {
  const guideRef = useRef(null);

  useEffect(() => {
    const steps = [
      {
        element: '#sidebar',
        title: 'Navigation',
        description: 'Use the sidebar to navigate between different sections of the dashboard.',
        position: 'right'
      },
      {
        element: '#nav-analytics',
        title: 'Analytics',
        description: 'Check your daily stats here.',
        position: 'right'
      },
      {
        element: '#header',
        title: 'Header',
        description: 'Manage your profile and settings from the top bar.',
        position: 'bottom'
      },
      {
        element: '#widget-sales',
        title: 'Sales Widget',
        description: 'View your current sales performance.',
        position: 'top'
      },
      {
        element: '#start-tour-btn',
        title: 'Help',
        description: 'Click here anytime to restart this tour.',
        position: 'left'
      }
    ];

    guideRef.current = new GuideMe(steps, {
      persistHints: false, // Hints disappear after clicking
      runOnce: true,       // Tour runs only once
      tourId: 'dashboard-v1'
    });

    // Add Hints
    guideRef.current.addHints([
      {
        element: '#widget-users',
        title: 'Active Users',
        description: 'This number updates in real-time.',
        position: 'top'
      },
      {
        element: '#widget-revenue',
        title: 'Revenue',
        description: 'Revenue is calculated before tax.',
        position: 'top'
      }
    ]);
  }, []);

  const startTour = () => {
    if (guideRef.current) {
      guideRef.current.start(true);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header onStartTour={startTour} />
        <div className="dashboard-grid">
          <Widget id="widget-sales" title="Total Sales" value="$12,345" />
          <Widget id="widget-users" title="Active Users" value="1,234" />
          <Widget id="widget-revenue" title="Revenue" value="$9,876" />
        </div>
      </div>
    </div>
  );
}

export default App;
