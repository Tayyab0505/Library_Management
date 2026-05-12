import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLogin, StudentSignup } from '../../api/AdminApi';

const AuthPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', rollNo: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('error');
    const [checking, setChecking] = useState(true);

    const showMessage = (msg, type = 'error') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 2000);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token) {
            navigate(role === 'admin' ? '/dashboard' : '/student-dashboard', { replace: true });
        } else {
            setChecking(false);
        }
    }, []);

    if (checking) {
        return null;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await AdminLogin(loginData);

            if (res.data.message === 'Welcome Admin') {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', 'admin');
                localStorage.setItem('adminEmail', loginData.email);
                navigate('/dashboard', { replace: true });
            }
            else if (res.data.message === 'Welcome Student') {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', 'student');
                localStorage.setItem('studentName', res.data.name);
                localStorage.setItem('studentEmail', res.data.email);
                localStorage.setItem('studentRollNo', res.data.rollNo);
                navigate('/student-dashboard', { replace: true });
            }
            else {
                showMessage(res.data.message);
            }
        } catch {
            showMessage('Something went wrong. Please try again.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await StudentSignup(signupData);
            if (res.data.message === 'Data saved successfully') {
                showMessage('Account created! Please login.', 'success');
                setActiveTab('login');
                setSignupData({ name: '', email: '', password: '', rollNo: '' });
            }
            else {
                showMessage(res.data.message);
            }
        } catch {
            showMessage('Signup failed. Please try again.');
        }
    };

    const inputClass = "w-full bg-[#0d1b2e] border border-[#185FA5] rounded-xl px-4 py-2.5 text-sm text-white mb-3.5 outline-none focus:border-[#378ADD] placeholder:text-[#378ADD]/40";
    const labelClass = "block text-xs text-[#85B7EB] mb-1";

    return (
        <div className="min-h-screen bg-[#0d1b2e] flex items-center justify-center p-8">
            <div className="flex gap-12 w-full max-w-[700px] items-center">

                {/* Left branding */}
                <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-9 h-9 bg-[#185FA5] rounded-lg flex items-center justify-center shrink-0">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="3" y="2" width="10" height="13" rx="1.5" fill="white" opacity="0.9" />
                                <rect x="7" y="5" width="10" height="13" rx="1.5" fill="#85B7EB" />
                                <rect x="9" y="8" width="6" height="1.5" rx="0.75" fill="white" />
                                <rect x="9" y="11" width="4" height="1.5" rx="0.75" fill="white" />
                            </svg>
                        </div>
                        <span className="text-xl font-medium text-white">Library Management</span>
                    </div>

                    <p className="text-xs text-[#85B7EB] mb-8">
                        Smart library system for admins and students
                    </p>

                    {[
                        'Admin manages books and students',
                        'Students browse and borrow books',
                        'Role-based access automatically',
                        'Track assignments and due dates',
                    ].map((f, i) => (
                        <div key={i} className="flex items-center gap-2.5 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#378ADD] shrink-0" />
                            <span className="text-sm text-[#B5D4F4]">{f}</span>
                        </div>
                    ))}
                </div>

                {/* Auth card */}
                <div className="bg-[#152a4c] border border-[#185FA5]/50 rounded-2xl p-8 w-[340px] shrink-0">

                    {/* Tabs */}
                    <div className="flex bg-[#0d1b2e] rounded-xl p-1 mb-6">
                        {['login', 'signup'].map(tab => (
                            <button
                                key={tab} onClick={() => { setActiveTab(tab); setMessage(''); }}
                                className={`flex-1 py-2 text-sm rounded-lg cursor-pointer transition-all duration-200 border-none
                                    ${activeTab === tab
                                        ? 'bg-[#185FA5] text-white font-medium'
                                        : 'bg-transparent text-[#85B7EB]'
                                    }`} >
                                {tab === 'login' ? 'Login' : 'Sign up'}
                            </button>
                        ))}
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`mb-4 px-3 py-2.5 rounded-xl text-xs font-medium border
                            ${messageType === 'error'
                                ? 'bg-[#1a0a0a] border-[#A32D2D] text-[#F09595]'
                                : 'bg-[#0a1a0a] border-[#3B6D11] text-[#97C459]'
                            }`}>
                            {message}
                        </div>
                    )}

                    {/* LOGIN FORM */}
                    {activeTab === 'login' && (
                        <form onSubmit={handleLogin}>
                            <label className={labelClass}>Email address</label>
                            <input type="email" placeholder="you@example.com" required value={loginData.email}
                                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                                className={inputClass} />

                            <label className={labelClass}>Password</label>
                            <input type="password" placeholder="••••••••" required value={loginData.password}
                                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                className={inputClass} />

                            <button type="submit"
                                className="w-full bg-[#185FA5] hover:bg-[#1a6db8] text-white text-sm font-medium py-2.5 rounded-xl mt-1 cursor-pointer transition-colors border-none">
                                Login
                            </button>

                            <p className="text-center text-xs text-[#85B7EB] mt-4">
                                Don't have an account?{' '}
                                <span onClick={() => setActiveTab('signup')}
                                    className="text-[#378ADD] underline cursor-pointer">
                                    Sign up
                                </span>
                            </p>
                        </form>
                    )}

                    {/* SIGNUP FORM */}
                    {activeTab === 'signup' && (
                        <form onSubmit={handleSignup}>
                            <div className="flex gap-2.5">
                                <div className="flex-1">
                                    <label className={labelClass}>Full name</label>
                                    <input placeholder="Your Name" required value={signupData.name}
                                        onChange={e => setSignupData({ ...signupData, name: e.target.value })}
                                        className={inputClass} />
                                </div>
                                <div className="flex-1">
                                    <label className={labelClass}>Roll no</label>
                                    <input placeholder="Roll No" required value={signupData.rollNo}
                                        onChange={e => setSignupData({ ...signupData, rollNo: e.target.value })}
                                        className={inputClass} />
                                </div>
                            </div>

                            <label className={labelClass}>Email address</label>
                            <input type="email" placeholder="you@example.com" required value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} className={inputClass} />

                            <label className={labelClass}>Password</label>
                            <input type="password" placeholder="••••••••" required value={signupData.password} onChange={e => setSignupData({ ...signupData, password: e.target.value })} className={inputClass} />

                            <button type="submit" className="w-full bg-[#185FA5] hover:bg-[#1a6db8] text-white text-sm font-medium py-2.5 rounded-xl mt-1 cursor-pointer transition-colors border-none">Create account</button>

                            <p className="text-center text-xs text-[#85B7EB] mt-4">
                                Already have an account?{' '}
                                <span onClick={() => setActiveTab('login')} className="text-[#378ADD] underline cursor-pointer">
                                    Login
                                </span>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;