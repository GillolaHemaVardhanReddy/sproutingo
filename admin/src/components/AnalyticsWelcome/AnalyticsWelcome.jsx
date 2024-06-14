import React, { useEffect, useState } from 'react';
import './AnalyticsWelcome.css';

const AnalyticsWelcome = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  return (
    <div className={`analytics-welcome-container ${showWelcome ? 'show' : ''}`}>
      <div className='card'>
        <h1 className={`analytics-welcome-heading ${showWelcome ? 'show' : ''}`}>
          Welcome to Analytics Dashboard
        </h1>
        <p className={`analytics-welcome-text ${showWelcome ? 'show' : ''}`}>
          Explore insights and data visualization!
        </p>
      </div>
    </div>
  );
};

export default AnalyticsWelcome;
