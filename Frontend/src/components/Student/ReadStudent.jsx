import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findById } from '../../api/StudentApi';

const ReadStudent = () => {
    const { id } = useParams();

    const [student, setStudent] = useState(null);

    useEffect(() => {
        findById(id)
            .then((res) => {
                setStudent(res.data);
            }).catch(err => console.log(err));
    }, [id]);

    return (
        <>
            <div className="hero min-h-screen bg-[rgb(245,246,250)] overflow-y-auto py-10 px-4 flex items-start justify-center">

                <div className="w-full sm:w-[90%] lg:w-[92%] bg-gray-800 text-white rounded-lg shadow-lg">
                    <div className="heading text-center">
                        <h1 className="my-5 text-3xl sm:text-4xl font-bold font-serif text-[#60a5fa]">Read Student</h1>
                    </div>
                    {student && (
                        <div>
                            <h3 className='my-5 mx-5 text-2xl font-serif font-bold'>Name: {student.name}</h3>
                            <h3 className='my-5 mx-5 text-2xl font-serif font-bold'>Roll No: {student.rollNo}</h3>
                            <h3 className='my-5 mx-5 text-2xl font-serif font-bold'>Marks: {student.marks}</h3>
                            <h3 className='my-5 mx-5 text-2xl font-serif font-bold'>Status:
                                <span className={`text-sm ml-2 px-2 py-1 font-serif rounded ${student.marks >= 50 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {student.marks >= 50 ? 'PASS' : 'FAIL'}
                                </span>
                            </h3>

                            <h3 className='my-5 mx-5 text-2xl font-bold font-serif'> Books Assigned: {
                                student.bookAssigned && student.bookAssigned.length > 0 ? student.bookAssigned.map(b => b.title).join(', ') : <span className='text-gray-500'>No Book</span>
                            }</h3>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end mr-4">
                        <Link to={'/students'}
                            type="submit"
                            className="px-6 py-2 mb-4 rounded-xl text-lg bg-gray-600 text-white hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#8b5cf6] hover:text-white transition font-serif">
                            back
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReadStudent