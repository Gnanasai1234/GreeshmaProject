import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import PredictionForm from './pages/PredictionForm';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';

function App() {
    const [user, setUser] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('diapredict_user');
        if (saved) setUser(JSON.parse(saved));
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('diapredict_user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('diapredict_user');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage user={user} />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
                <Route path="/predict" element={<PredictionForm user={user} onResult={setPredictionResult} />} />
                <Route path="/result" element={<ResultPage result={predictionResult} user={user} />} />
                <Route path="/history" element={<HistoryPage user={user} />} />
            </Routes>
        </Router>
    );
}

export default App;
