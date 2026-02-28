import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserMd } from 'react-icons/fa';
import API from '../api';

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await API.post('/auth/register', form);
            setSuccess('Account created! Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen animated-gradient flex items-center justify-center p-4 font-poppins">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUserMd className="text-3xl text-accent" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary">Create Account</h2>
                    <p className="text-gray-400 mt-2">Join DiaPredict today</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-4 text-sm">{success}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Full Name" required value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" placeholder="Email address" required value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="password" placeholder="Password" required value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        />
                    </div>
                    <div className="relative">
                        <FaUserMd className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all appearance-none"
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full bg-accent hover:bg-accent/90 text-white py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <div className="spinner"></div> : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent font-semibold hover:underline">Sign In</Link>
                </p>
                <p className="text-center mt-3">
                    <Link to="/" className="text-gray-400 text-sm hover:text-accent transition-colors">← Back to Home</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
