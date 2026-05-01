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

        console.log('logging data');

        setLogStatus('');

        const Admin = {
            email,
            password
        }

        try {
            const res = await AdminLogin(Admin);

            if (res.data.message === 'You are not authorised') {
                setLogStatus(res.data.message);
            } else if (res.data.message === 'Incorrect password') {
                setLogStatus(res.data.message);
            } else if (res.data.message === 'Welcome Admin') {
                navigate('/assignBook');
            };
        } catch (error) {
            console.error('Failed to add student:', error);
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
            <div className="hero min-h-screen bg-[rgb(245,246,250)] overflow-y-auto py-10 px-4 flex items-start justify-center font-serif">

                <div className=" sm:w-[50%] lg:w-[95%] bg-gray-800 text-white rounded-lg shadow-lg">
                    <div className="heading text-center">
                        <h1 className="my-5 text-3xl sm:text-4xl font-bold">Admin Login</h1>
                    </div>

                    <form className="p-5 " onSubmit={logAdmin}>
                        <div className="initials flex md:flex-row flex-col ml-23">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="Email" className="text-xl mb-1">
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    name="Email"
                                    id="Email"
                                    placeholder="Enter Email"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col ml-10">
                                <label htmlFor="Password" className="text-xl mb-1">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    name="Password"
                                    id="Password"
                                    placeholder="Enter Password Name"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                        </div>
                        <span className={statusHolder}>{logStatus}</span>

                        <div className="mt-20 flex justify-end">
                            <Link to={'/dashboard'}
                                type="submit"
                                className="px-6 py-2 mx-2 rounded-xl text-lg bg-gray-600 text-white hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#8b5cf6] hover:text-white transition"
                            >
                                cancel
                            </Link>

                            <button
                                type="submit"
                                className="px-6 py-2 rounded-xl text-lg bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-bold hover:from-[#2563eb] hover:to-[#7c3aed] transition"
                            >
                                Login
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin