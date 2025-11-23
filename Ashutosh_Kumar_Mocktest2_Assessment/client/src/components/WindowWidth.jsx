import React, { useState, useEffect } from 'react';

// Higher-Order Component
const withWindowWidth = (WrappedComponent) => {
    return (props) => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return <WrappedComponent {...props} windowWidth={windowWidth} />;
    };
};

// Component using the HOC
const WindowWidthDisplay = ({ windowWidth }) => {
    return (
        <div style={{ padding: '10px', backgroundColor: '#e0e0e0', margin: '10px' }}>
            <h3>Responsive Layout Tracker</h3>
            <p>Current Width: {windowWidth}px</p>
            {windowWidth < 600 ? <p>Mobile View</p> : <p>Desktop View</p>}
        </div>
    );
};

export const ResponsiveComponent = withWindowWidth(WindowWidthDisplay);
