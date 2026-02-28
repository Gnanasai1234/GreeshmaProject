import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChartBar, FaCheckCircle, FaTimesCircle, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import API from '../api';

function Dashboard({ user, onLogout }) {
    const navigate = useNavigate();
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchPredictions();
    }, [user]);

    const fetchPredictions = async () => {
        try {
            const res = await API.get(`/predictions/${user.id}`);
            setPredictions(res.data);
        } catch (err) {
            console.error('Failed to load predictions:', err);
        } finally {
            setLoading(false);
        }
    };

    const total = predictions.length;
    const diabeticCount = predictions.filter(p => p.result === 'Diabetic').length;
    const nonDiabeticCount = predictions.filter(p => p.result === 'Non-Diabetic').length;
    const recent = predictions.slice(0, 5);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            {/* Top Nav */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        <span className="text-accent">Dia</span>Predict
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/history" className="text-gray-500 hover:text-accent transition-colors font-medium">History</Link>
                        <button onClick={() => { onLogout(); navigate('/'); }}
                            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors font-medium">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Banner */}
                <div className="animated-gradient rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <h1 className="text-3xl font-bold mb-2 relative z-10">Welcome back, {user.name}! 👋</h1>
                    <p className="text-white/70 text-lg relative z-10">Your health dashboard at a glance</p>
                </div>

                {/* Stat Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FaChartBar className="text-xl text-blue-600" />
                            </div>
                            <span className="text-3xl font-bold text-primary">{total}</span>
                        </div>
                        <p className="text-gray-500 font-medium">Total Predictions</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <FaTimesCircle className="text-xl text-red-500" />
                            </div>
                            <span className="text-3xl font-bold text-red-500">{diabeticCount}</span>
                        </div>
                        <p className="text-gray-500 font-medium">Diabetic</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaCheckCircle className="text-xl text-green-500" />
                            </div>
                            <span className="text-3xl font-bold text-green-500">{nonDiabeticCount}</span>
                        </div>
                        <p className="text-gray-500 font-medium">Non-Diabetic</p>
                    </div>
                </div>

                {/* Quick Action */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-primary">Recent Predictions</h2>
                    <Link to="/predict"
                        className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 flex items-center gap-2">
                        <FaPlus /> New Prediction
                    </Link>
                </div>

                {/* Recent Predictions Table */}
                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="spinner border-accent border-t-transparent !w-10 !h-10"></div>
                    </div>
                ) : recent.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-gray-100">
                        <FaChartBar className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No predictions yet. Start your first screening!</p>
                        <Link to="/predict" className="inline-block mt-4 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-all">
                            Make First Prediction
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Date</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Result</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Confidence</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Glucose</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">BMI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map((p, i) => (
                                    <tr key={p.id} className={`border-t border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(p.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.result === 'Diabetic' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                {p.result === 'Diabetic' ? '🔴' : '🟢'} {p.result}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">{(p.confidence * 100).toFixed(0)}%</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.glucose}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.bmi}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
