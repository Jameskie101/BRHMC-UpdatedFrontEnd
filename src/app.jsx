import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('app.jsx loaded');

function App() {
    return (
        <>
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <strong className="is-size-4">BRHMC-iHOMIS</strong>
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-primary">Sign up</button>
                                <button className="button is-light">Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="section">
                <div className="container">
                    <h1 className="title is-size-1">Welcome to BRHMC-iHOMIS</h1>
                    <p className="subtitle is-size-5">Your React frontend with Bulma is ready to go!</p>
                    <div className="box" style={{ marginTop: '2rem' }}>
                        <div className="content">
                            <p>This is a professional healthcare management system built with:</p>
                            <ul>
                                <li><strong>Frontend:</strong> React + Vite</li>
                                <li><strong>Backend:</strong> Laravel</li>
                                <li><strong>Styling:</strong> Bulma CSS Framework</li>
                                <li><strong>Database:</strong> MySQL</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

console.log('About to render React app');
const appElement = document.getElementById('app');
console.log('App element:', appElement);

if (appElement) {
    try {
        const root = createRoot(appElement);
        root.render(<App />);
        console.log('React app mounted successfully');
    } catch (error) {
        console.error('Failed to mount React app:', error);
    }
} else {
    console.error('App element not found!');
}
console.log('App element:', appElement);

if (appElement) {
    import('react-dom/client').then(({ createRoot }) => {
        try {
            const root = createRoot(appElement);
            root.render(<App />);
            console.log('React app mounted successfully');
        } catch (error) {
            console.error('Failed to mount React app:', error);
        }
    });
} else {
    console.error('App element not found!');
}
