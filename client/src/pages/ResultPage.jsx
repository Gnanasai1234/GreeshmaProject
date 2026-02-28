import { Link, useNavigate } from 'react-router-dom';
import { FaHistory, FaRedoAlt } from 'react-icons/fa';
import { RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Normal ranges for comparison
const normalRanges = {
    pregnancies: { min: 0, max: 5, label: 'Pregnancies' },
    glucose: { min: 70, max: 100, label: 'Glucose' },
    bloodPressure: { min: 60, max: 80, label: 'Blood Pressure' },
    skinThickness: { min: 10, max: 50, label: 'Skin Thickness' },
    insulin: { min: 16, max: 166, label: 'Insulin' },
    bmi: { min: 18.5, max: 24.9, label: 'BMI' },
    dpf: { min: 0.08, max: 2.42, label: 'DPF' },
    age: { min: 20, max: 60, label: 'Age' },
};

function ResultPage({ result, user }) {
    const navigate = useNavigate();

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center font-poppins bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-400 text-lg mb-4">No prediction result found.</p>
                    <Link to="/predict" className="text-accent hover:underline font-semibold">Make a prediction</Link>
                </div>
            </div>
        );
    }

    const isDiabetic = result.result === 'Diabetic';
    const confidencePercent = Math.round(result.confidence * 100);

    // Radial chart data
    const radialData = [
        { name: 'Confidence', value: confidencePercent, fill: isDiabetic ? '#ef4444' : '#22c55e' }
    ];

    // Bar chart: input vs normal max
    const barData = result.inputs ? Object.keys(normalRanges).map(key => ({
        name: normalRanges[key].label,
        'Your Value': Number(result.inputs[key]) || 0,
        'Normal Max': normalRanges[key].max,
    })) : [];

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            {/* Nav */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary"><span className="text-accent">Dia</span>Predict</Link>
                    <Link to="/dashboard" className="text-gray-500 hover:text-accent transition-colors font-medium">← Dashboard</Link>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Result Badge */}
                <div className={`rounded-2xl p-8 text-center mb-8 shadow-xl ${isDiabetic ? 'bg-gradient-to-br from-red-500 to-red-700' : 'bg-gradient-to-br from-green-500 to-emerald-700'} text-white`}>
                    <div className="text-6xl mb-4">{isDiabetic ? '🔴' : '🟢'}</div>
                    <h1 className="text-4xl font-extrabold mb-2">{result.result.toUpperCase()}</h1>
                    <p className="text-white/80 text-lg">
                        {isDiabetic ? 'High risk detected — please consult a healthcare professional' : 'Low risk — continue maintaining a healthy lifestyle'}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Confidence Gauge */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 flex flex-col items-center">
                        <h2 className="text-lg font-bold text-primary mb-4">Confidence Score</h2>
                        <div className="relative">
                            <RadialBarChart width={220} height={220} cx={110} cy={110} innerRadius={70} outerRadius={100} startAngle={180} endAngle={0} data={radialData}>
                                <RadialBar dataKey="value" cornerRadius={10} background clockWise />
                            </RadialBarChart>
                            <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-20px' }}>
                                <span className="text-4xl font-extrabold text-primary">{confidencePercent}%</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">Model prediction confidence</p>
                    </div>

                    {/* Input vs Normal Range Chart */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <h2 className="text-lg font-bold text-primary mb-4">Your Values vs Normal Range</h2>
                        {barData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                    <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-30} textAnchor="end" height={50} />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip />
                                    <Bar dataKey="Your Value" radius={[4, 4, 0, 0]}>
                                        {barData.map((entry, idx) => (
                                            <Cell key={idx} fill={entry['Your Value'] > entry['Normal Max'] ? '#ef4444' : '#00b4d8'} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="Normal Max" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-400 text-center py-10">Chart data unavailable</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center mt-8">
                    <Link to="/history"
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                        <FaHistory /> View History
                    </Link>
                    <Link to="/predict"
                        className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/30">
                        <FaRedoAlt /> Predict Again
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
