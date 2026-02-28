import { Link } from 'react-router-dom';
import { FaHeartbeat, FaBrain, FaBolt, FaArrowRight } from 'react-icons/fa';

function LandingPage({ user }) {
    return (
        <div className="min-h-screen font-poppins">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary">
                        <span className="text-accent">Dia</span>Predict
                    </h1>
                    <div className="flex gap-4">
                        {user ? (
                            <Link to="/dashboard" className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/30">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-primary hover:text-accent font-medium px-4 py-2 transition-colors duration-300">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/30">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="animated-gradient min-h-screen flex items-center justify-center text-white relative overflow-hidden">
                {/* Floating circles */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

                <div className="text-center z-10 px-6 max-w-4xl">
                    <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
                        <span className="text-sm font-medium">🔬 AI-Powered Health Screening</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        Detect Diabetes<br />
                        <span className="text-accent-light">Before It Begins</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Powered by machine learning to predict diabetes risk with clinical-grade accuracy using 8 simple health metrics.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/register" className="group bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 hover:scale-105 flex items-center gap-2">
                            Start Screening <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/login" className="border-2 border-white/40 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white">
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 text-primary">Why DiaPredict?</h2>
                    <p className="text-center text-gray-500 mb-16 text-lg">Trusted by healthcare professionals worldwide</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <FaHeartbeat className="text-4xl" />, title: 'Early Detection', desc: 'Identify diabetes risk factors early, enabling timely preventive measures and lifestyle changes.' },
                            { icon: <FaBrain className="text-4xl" />, title: 'AI Powered', desc: 'Random Forest ML model trained on clinical data delivers highly accurate predictions you can trust.' },
                            { icon: <FaBolt className="text-4xl" />, title: 'Instant Results', desc: 'Get your diabetes risk assessment in seconds — no waiting, no complex procedures required.' },
                        ].map((f, i) => (
                            <div key={i} className="group bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                                <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-primary">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary text-white/60 py-8 text-center text-sm">
                © 2026 DiaPredict. Early Diabetes Detection with AI.
            </footer>
        </div>
    );
}

export default LandingPage;
