import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLogin, StudentSignup } from '../../api/AdminApi';

const AuthPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');

    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const [signupData, setSignupData] = useState({
        name: '', email: '', password: '', rollNo: '', marks: ''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('error');
    const [checking, setChecking] = useState(true);

    const showMessage = (msg, type = 'error') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 2000);
    };

    // If already logged in, redirect
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
                navigate('/student-dashboard', { replace: true });
            } else {
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
                setSignupData({ name: '', email: '', password: '', rollNo: '', marks: '' });
            } else {
                showMessage(res.data.message);
            }
        } catch {
            showMessage('Signup failed. Please try again.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh', background: '#0d1b2e',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
        }}>
            <div style={{ display: 'flex', gap: '3rem', width: '100%', maxWidth: '700px', alignItems: 'center' }}>

                {/* Left branding */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{
                            width: '36px', height: '36px', background: '#185FA5',
                            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>

                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="3" y="2" width="10" height="13" rx="1.5" fill="white" opacity="0.9" />
                                <rect x="7" y="5" width="10" height="13" rx="1.5" fill="#85B7EB" />
                                <rect x="9" y="8" width="6" height="1.5" rx="0.75" fill="white" />
                                <rect x="9" y="11" width="4" height="1.5" rx="0.75" fill="white" />
                            </svg>
                        </div>
                        <span style={{ fontSize: '20px', fontWeight: '500', color: '#fff' }}>
                            Library Management
                        </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#85B7EB', marginBottom: '2rem' }}>
                        Smart library system for admins and students
                    </p>
                    {[
                        'Admin manages books and students',
                        'Students browse and borrow books',
                        'Role-based access automatically',
                        'Track assignments and due dates',
                    ].map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#378ADD', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', color: '#B5D4F4' }}>{f}</span>
                        </div>
                    ))}
                </div>

                {/* Auth card */}
                <div style={{
                    background: '#152a4c', border: '0.5px solid #185FA5',
                    borderRadius: '16px', padding: '2rem', width: '340px', flexShrink: 0
                }}>
                    {/* Tabs */}
                    <div style={{
                        display: 'flex', background: '#0d1b2e',
                        borderRadius: '10px', padding: '4px', marginBottom: '1.5rem'
                    }}>
                        {['login', 'signup'].map(tab => (
                            <button key={tab} onClick={() => { setActiveTab(tab); setMessage(''); }}
                                style={{
                                    flex: 1, padding: '8px', fontSize: '13px', border: 'none', cursor: 'pointer',
                                    borderRadius: '8px', transition: 'background 0.2s',
                                    background: activeTab === tab ? '#185FA5' : 'transparent',
                                    color: activeTab === tab ? '#fff' : '#85B7EB',
                                    fontWeight: activeTab === tab ? '500' : '400'
                                }}>
                                {tab === 'login' ? 'Login' : 'Sign up'}
                            </button>
                        ))}
                    </div>

                    {/* Error / success message */}
                    {message && (
                        <div style={{
                            background: messageType === 'error' ? '#1a0a0a' : '#0a1a0a',
                            border: `0.5px solid ${messageType === 'error' ? '#A32D2D' : '#3B6D11'}`,
                            borderRadius: '6px', padding: '8px 12px',
                            fontSize: '12px',
                            color: messageType === 'error' ? '#F09595' : '#97C459',
                            marginBottom: '12px'
                        }}>
                            {message}
                        </div>
                    )}

                    {/* LOGIN FORM */}
                    {activeTab === 'login' && (
                        <form onSubmit={handleLogin}>
                            {[
                                { label: 'Email address', key: 'email', type: 'email', placeholder: 'you@example.com' },
                                { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
                            ].map(({ label, key, type, placeholder }) => (
                                <div key={key}>
                                    <p style={{ fontSize: '12px', color: '#85B7EB', marginBottom: '5px' }}>{label}</p>
                                    <input type={type} placeholder={placeholder} required
                                        value={loginData[key]}
                                        onChange={e => setLoginData({ ...loginData, [key]: e.target.value })}
                                        style={{
                                            width: '100%', background: '#0d1b2e', border: '0.5px solid #185FA5',
                                            borderRadius: '8px', padding: '10px 14px', fontSize: '13px',
                                            color: '#fff', marginBottom: '14px', outline: 'none'
                                        }}
                                    />
                                </div>
                            ))}
                            <button type="submit" style={{
                                width: '100%', background: '#185FA5', color: '#fff',
                                border: 'none', borderRadius: '8px', padding: '11px',
                                fontSize: '14px', fontWeight: '500', cursor: 'pointer', marginTop: '4px'
                            }}>
                                Login
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '12px', color: '#85B7EB', marginTop: '1rem' }}>
                                Don't have an account?{' '}
                                <span onClick={() => setActiveTab('signup')}
                                    style={{ color: '#378ADD', cursor: 'pointer', textDecoration: 'underline' }}>
                                    Sign up
                                </span>
                            </p>
                        </form>
                    )}

                    {/* SIGNUP FORM */}
                    {activeTab === 'signup' && (
                        <form onSubmit={handleSignup}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {[
                                    { label: 'Full name', key: 'name', placeholder: 'Ali Hassan' },
                                    { label: 'Roll no', key: 'rollNo', placeholder: 'CS-101' },
                                ].map(({ label, key, placeholder }) => (
                                    <div key={key} style={{ flex: 1 }}>
                                        <p style={{ fontSize: '12px', color: '#85B7EB', marginBottom: '5px' }}>{label}</p>
                                        <input placeholder={placeholder} required
                                            value={signupData[key]}
                                            onChange={e => setSignupData({ ...signupData, [key]: e.target.value })}
                                            style={{
                                                width: '100%', background: '#0d1b2e', border: '0.5px solid #185FA5',
                                                borderRadius: '8px', padding: '10px 14px', fontSize: '13px',
                                                color: '#fff', marginBottom: '14px', outline: 'none'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: '12px', color: '#85B7EB', marginBottom: '5px' }}>Email address</p>
                            <input type="email" placeholder="you@example.com" required
                                value={signupData.email}
                                onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                                style={{
                                    width: '100%', background: '#0d1b2e', border: '0.5px solid #185FA5',
                                    borderRadius: '8px', padding: '10px 14px', fontSize: '13px',
                                    color: '#fff', marginBottom: '14px', outline: 'none'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {[
                                    { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
                                    { label: 'Marks', key: 'marks', type: 'number', placeholder: '85' },
                                ].map(({ label, key, type, placeholder }) => (
                                    <div key={key} style={{ flex: 1 }}>
                                        <p style={{ fontSize: '12px', color: '#85B7EB', marginBottom: '5px' }}>{label}</p>
                                        <input type={type || 'text'} placeholder={placeholder} required
                                            value={signupData[key]}
                                            onChange={e => setSignupData({ ...signupData, [key]: e.target.value })}
                                            style={{
                                                width: '100%', background: '#0d1b2e', border: '0.5px solid #185FA5',
                                                borderRadius: '8px', padding: '10px 14px', fontSize: '13px',
                                                color: '#fff', marginBottom: '14px', outline: 'none'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button type="submit" style={{
                                width: '100%', background: '#185FA5', color: '#fff',
                                border: 'none', borderRadius: '8px', padding: '11px',
                                fontSize: '14px', fontWeight: '500', cursor: 'pointer', marginTop: '4px'
                            }}>
                                Create account
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '12px', color: '#85B7EB', marginTop: '1rem' }}>
                                Already have an account?{' '}
                                <span onClick={() => setActiveTab('login')}
                                    style={{ color: '#378ADD', cursor: 'pointer', textDecoration: 'underline' }}>
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