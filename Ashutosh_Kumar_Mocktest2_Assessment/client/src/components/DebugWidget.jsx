import React, { useState, useEffect } from 'react';

// Higher-Order Component for window width tracking
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

// Debug Widget Component
const DebugWidgetContent = ({ windowWidth }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Debug Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                }}
                title="UI Debugger"
            >
                Debug
            </button>

            {/* Debug Panel */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    backgroundColor: 'white',
                    border: '2px solid #007bff',
                    borderRadius: '8px',
                    padding: '15px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    zIndex: 999,
                    minWidth: '200px',
                }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>UI Debugger</h4>
                    <p style={{ margin: '5px 0' }}>
                        <strong>Width:</strong> {windowWidth}px
                    </p>
                    <p style={{ margin: '5px 0', color: windowWidth < 600 ? '#dc3545' : '#28a745' }}>
                        <strong>Mode:</strong> {windowWidth < 600 ? 'Mobile' : 'Desktop'}
                    </p>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            marginTop: '10px',
                            padding: '5px 10px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </>
    );
};

export const DebugWidget = withWindowWidth(DebugWidgetContent);
