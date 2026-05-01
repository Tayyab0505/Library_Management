import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editStudent, findById } from '../../api/StudentApi';
import "../../App.css";

const EditStudent = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [marks, setMarks] = useState('');

    const [logStatus, setLogStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    useEffect(() => {
        findById(id)
            .then(res => {
                setName(res.data.name);
                setRollNo(res.data.rollNo);
                setMarks(res.data.marks);
            }).catch(err => {
                console.error("Failed to fetch student:", err);
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedStudent = {
            name,
            rollNo,
            marks: parseInt(marks)
        };

        editStudent(id, updatedStudent)
            .then((res) => {
                if (res.data.message === 'This roll number already exist') {
                    setLogStatus(res.data.message);
                } else if (res.data.message === 'Student updated successfuly') {
                    setLogStatus(res.data.message);
                    navigate('/students')
                };
            }).catch(err => {
                console.error("Failed to update:", err);
            });
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
            <div className="hero min-h-screen bg-[rgb(245,246,250)] overflow-y-auto py-10 px-4 flex items-start justify-center">
                <div className="w-full sm:w-[90%] lg:w-[96%] bg-gray-800 text-white rounded-lg shadow-lg">
                    <div className="heading text-center">
                        <h1 className="my-5 text-3xl font-serif text-[#60a5fa] sm:text-4xl font-bold">Update Student</h1>
                    </div>

                    <form className="p-5" onSubmit={handleUpdate}>
                        <div className="initials flex md:flex-row flex-col justify-evenly gap-4">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="full-name" className="text-xl mb-1">
                                    Full Name:
                                </label>
                                <input
                                    type="text"
                                    name="full-name"
                                    id="full-name"
                                    placeholder="Name"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="roll-no" className="text-xl mb-1">
                                    Roll No:
                                </label>
                                <input
                                    type="text"
                                    name="roll-no"
                                    id="roll-no"
                                    placeholder="Roll Number"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={rollNo}
                                    onChange={(e) => setRollNo(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="marks" className="text-xl mb-1">
                                    Marks:
                                </label>
                                <input
                                    type="number"
                                    name="marks"
                                    id="marks"
                                    placeholder="Marks"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                />
                            </div>
                        </div>

                        <span className={statusHolder}>{logStatus}</span>

                        <div className="mt-6 flex justify-end">
                            <Link to={'/students'}
                                type="submit"
                                className="px-6 py-2 mx-2 rounded-xl text-lg bg-gray-600 text-white hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#8b5cf6] hover:text-white transition"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="px-6 py-2 rounded-xl text-lg bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-bold hover:from-[#2563eb] hover:to-[#7c3aed] transition"
                            >
                                Update
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditStudent