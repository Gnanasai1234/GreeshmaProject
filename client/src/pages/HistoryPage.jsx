import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFilter, FaSignOutAlt } from 'react-icons/fa';
import API from '../api';

function HistoryPage({ user }) {
    const navigate = useNavigate();
    const [predictions, setPredictions] = useState([]);
    const [filter, setFilter] = useState('All');
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
            console.error('Failed to load history:', err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = filter === 'All'
        ? predictions
        : predictions.filter(p => p.result === filter);

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            {/* Nav */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary"><span className="text-accent">Dia</span>Predict</Link>
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="text-gray-500 hover:text-accent transition-colors font-medium">Dashboard</Link>
                        <Link to="/predict" className="bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-all">+ New</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Prediction History</h1>
                        <p className="text-gray-400 mt-1">{predictions.length} total predictions</p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2 items-center">
                        <FaFilter className="text-gray-400" />
                        {['All', 'Diabetic', 'Non-Diabetic'].map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${filter === f
                                        ? 'bg-accent text-white shadow-lg shadow-accent/30'
                                        : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                    }`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="spinner border-accent border-t-transparent !w-10 !h-10"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-gray-100">
                        <p className="text-gray-400 text-lg">No predictions found for this filter.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">#</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Date</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Result</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Confidence</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Glucose</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">BMI</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Age</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">BP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p, i) => (
                                    <tr key={p.id}
                                        className={`border-t transition-colors hover:bg-gray-50/70 ${p.result === 'Diabetic' ? 'border-l-4 border-l-red-400 bg-red-50/30' : 'border-l-4 border-l-green-400 bg-green-50/30'
                                            }`}>
                                        <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.result === 'Diabetic' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                {p.result === 'Diabetic' ? '🔴' : '🟢'} {p.result}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${p.result === 'Diabetic' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${p.confidence * 100}%` }}></div>
                                                </div>
                                                <span className="text-sm font-semibold text-primary">{(p.confidence * 100).toFixed(0)}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.glucose}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.bmi}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.age}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.blood_pressure}</td>
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

export default HistoryPage;
