import React, { useState } from 'react';
import Quiz from './Quiz';
import MathematicsQuiz from './MathematicsQuiz';
import JavaScriptQuiz from './JavaScriptQuiz';
import Login from './Login';
import Register from './Register'; // Import Register component
import UpdateUser from './UpdateUser'; // Import UpdateUser component
import './Login.css';
import './Register.css';
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const [showRegister, setShowRegister] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleShowRegister = () => {
        setShowRegister(true);
    };

    const handleShowUpdate = () => {
        setShowUpdate(true);
    };

    return (
        <div className="app">
            <div><h1>Welcome! Log In to Get Started &#x1F60A;</h1></div>
            <div><h2>Test your knowledge, and let curiosity lead the way.</h2></div>
            {!isLoggedIn ? (
                <>
                    <Login onLogin={handleLogin} />
                    <button onClick={handleShowRegister}>Register</button>
                    {showRegister && <Register />} {/* Show Register component */}
                </>
            ) : (
                <>
                    <div><h1>Welcome To Quiz Application &#127754;</h1></div>
                    <div className="tab-container">
                        <button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? 'active' : ''}>
                            General Quiz
                        </button>
                        <button onClick={() => setActiveTab('math')} className={activeTab === 'math' ? 'active' : ''}>
                            Mathematics Quiz
                        </button>
                        <button onClick={() => setActiveTab('js')} className={activeTab === 'js' ? 'active' : ''}>
                            JavaScript Quiz
                        </button>
                        <button onClick={handleShowUpdate}>
                            Update Password
                        </button>
                    </div>
                    <div className="content-container">
                        {activeTab === 'general' && <Quiz />}
                        {activeTab === 'math' && <MathematicsQuiz />}
                        {activeTab === 'js' && <JavaScriptQuiz />}
                        {showUpdate && <UpdateUser />} {/* Show UpdateUser component */}
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
