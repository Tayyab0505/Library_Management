import React, { useEffect, useState } from "react";
import { addStudent } from "../../api/StudentApi";
import { Link } from "react-router-dom";
import "../../App.css";

const AddStudent = () => {
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [marks, setMarks] = useState('');
    const [logStatus, setLogStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const handleAdd = async (e) => {
        e.preventDefault();
        const newStudent = { name, rollNo, marks: parseInt(marks) };

        try {
            const res = await addStudent(newStudent);
            if (res.data.message === 'This roll Number already exist') {
                setLogStatus(res.data.message);
            } else if (res.data.message === 'Data saved successfully') {
                setLogStatus(res.data.message);
                setName('');
                setRollNo('');
                setMarks('');
            }
        } catch (error) {
            console.error('Failed to add student:', error);
        }
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
        <div className="min-h-screen bg-[#F5F6FA] flex justify-center items-start font-serif p-10">
            <div className="w-full sm:w-[90%] lg:w-[94%] bg-gray-800 rounded-lg shadow-lg p-6">

                {/* Heading */}
                <div className="text-center">
                    <h1 className="my-5 text-3xl font-serif sm:text-4xl font-bold text-[#60a5fa]">
                        Add New Student
                    </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleAdd}>
                    <div className="flex flex-col md:flex-row justify-evenly gap-4">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="full-name" className="text-lg mb-1 text-white">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                id="full-name"
                                placeholder="Enter your full name"
                                className="w-full md:w-[300px] px-4 py-2 rounded-xl border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#60a5fa]"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="roll-no" className="text-lg mb-1 text-white">
                                Roll No:
                            </label>
                            <input
                                type="text"
                                id="roll-no"
                                placeholder="Enter your roll no"
                                className="w-full md:w-[300px] px-4 py-2 rounded-xl border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#60a5fa]"
                                required
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-3">
                            <label htmlFor="marks" className="text-lg mb-1 text-white">
                                Marks:
                            </label>
                            <input
                                type="number"
                                id="marks"
                                placeholder="Enter marks"
                                className="w-full md:w-[300px] px-4 py-2 rounded-xl border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#60a5fa]"
                                required
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Status Message */}
                    <span className={`${statusHolder} text-[#60a5fa]`}>{logStatus}</span>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end">
                        <Link
                            to={'/students'}
                            className="px-6 py-2 mx-2 rounded-xl text-lg bg-gray-600 text-white hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#8b5cf6] hover:text-white transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-xl text-lg bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-bold hover:from-[#2563eb] hover:to-[#7c3aed] transition"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;