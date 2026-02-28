import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaStethoscope, FaInfoCircle } from 'react-icons/fa';
import API from '../api';

const fields = [
    { name: 'pregnancies', label: 'Pregnancies', tip: 'Number of pregnancies (0 if male/none)', type: 'number', min: 0, max: 20, step: 1 },
    { name: 'glucose', label: 'Glucose', tip: 'Plasma glucose concentration (mg/dL) — Normal: 70-100', type: 'number', min: 0, max: 300, step: 1 },
    { name: 'bloodPressure', label: 'Blood Pressure', tip: 'Diastolic blood pressure (mm Hg) — Normal: 60-80', type: 'number', min: 0, max: 200, step: 1 },
    { name: 'skinThickness', label: 'Skin Thickness', tip: 'Triceps skin fold thickness (mm) — Normal: 10-50', type: 'number', min: 0, max: 100, step: 1 },
    { name: 'insulin', label: 'Insulin', tip: '2-hour serum insulin (mu U/ml) — Normal: 16-166', type: 'number', min: 0, max: 900, step: 1 },
    { name: 'bmi', label: 'BMI', tip: 'Body Mass Index (kg/m²) — Normal: 18.5-24.9', type: 'number', min: 0, max: 70, step: 0.1 },
    { name: 'dpf', label: 'Diabetes Pedigree Function', tip: 'Genetic diabetes risk score — Typical: 0.08-2.42', type: 'number', min: 0, max: 3, step: 0.01 },
    { name: 'age', label: 'Age', tip: 'Age in years', type: 'number', min: 1, max: 120, step: 1 },
];

function PredictionForm({ user, onResult }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        pregnancies: '', glucose: '', bloodPressure: '', skinThickness: '',
        insulin: '', bmi: '', dpf: '', age: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (name, value) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await API.post('/predict', { userId: user.id, ...form });
            onResult(res.data);
            navigate('/result');
        } catch (err) {
            setError(err.response?.data?.message || 'Prediction failed. Make sure the ML service is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            {/* Nav */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary"><span className="text-accent">Dia</span>Predict</Link>
                    <Link to="/dashboard" className="text-gray-500 hover:text-accent transition-colors font-medium">← Dashboard</Link>
                </div>
            </nav>

            <div className="max-w-3xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaStethoscope className="text-2xl text-accent" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary">Diabetes Risk Assessment</h1>
                    <p className="text-gray-400 mt-2">Enter your health metrics for an AI-powered prediction</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="grid md:grid-cols-2 gap-5">
                        {fields.map(f => (
                            <div key={f.name} className="group">
                                <label className="block text-sm font-semibold text-primary mb-1.5 flex items-center gap-2">
                                    {f.label}
                                    <span className="relative">
                                        <FaInfoCircle className="text-gray-300 hover:text-accent cursor-help transition-colors" />
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-primary text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                            {f.tip}
                                        </span>
                                    </span>
                                </label>
                                <input
                                    type={f.type}
                                    min={f.min}
                                    max={f.max}
                                    step={f.step}
                                    required
                                    value={form[f.name]}
                                    onChange={e => handleChange(f.name, e.target.value)}
                                    placeholder={f.tip.split('—')[0].trim()}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                                />
                            </div>
                        ))}
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full mt-8 bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-50 pulse-glow flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <><div className="spinner"></div> Analyzing...</>
                        ) : (
                            '🔬 Predict Now'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PredictionForm;
