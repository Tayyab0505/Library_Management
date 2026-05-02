import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AdminLogin } from '../../api/AdminApi';
import "../../App.css";

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [logStatus, setLogStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const logAdmin = async (e) => {
        e.preventDefault();

        setLogStatus('');

        try {
            const res = await AdminLogin({ email, password });

            if (res.data.message === 'Welcome Admin') {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', 'admin');
                localStorage.setItem('adminEmail', email);
                navigate('/dashboard');
            } else {
                setLogStatus(res.data.message);
            };
        } catch (error) {
            setLogStatus('Something went wrong. Please try again.');
            console.error('Login error:', error);
        };
    };

    useEffect(() => {
        if (logStatus !== '') {
            setStatusHolder('showMessage');
            const timer = setTimeout(() => {
                setStatusHolder('message');
                setLogStatus('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [logStatus]);

    return (
        <>
            <div className="min-h-screen bg-[rgb(245,246,250)] flex items-center justify-center px-4 font-serif">
                <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>

                    <form onSubmit={logAdmin} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="Email" className="text-lg mb-1">Email</label>
                            <input
                                type="email"
                                id="Email"
                                placeholder="Enter Email"
                                className="px-4 py-2 rounded-xl border text-black"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="Password" className="text-xl mb-1">Password</label>
                            <input
                                type="password"
                                id="Password"
                                placeholder="Enter Password"
                                className="px-4 py-2 rounded-xl border text-black"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <span className={statusHolder}>{logStatus}</span>

                        <button
                            type="submit"
                            className="mt-4 px-6 py-2 rounded-xl text-lg bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-bold hover:from-[#2563eb] hover:to-[#7c3aed] transition">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin