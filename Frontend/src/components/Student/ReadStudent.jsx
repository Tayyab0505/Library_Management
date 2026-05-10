import { useEffect, useState } from 'react'
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

    if (!student) {
        return (
            <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
            </div>
        )
    };

    const rows = [
        { label: 'Full Name', value: student.name },
        { label: 'Roll No', value: student.rollNo },
        {
            label: 'Books Assigned',
            value: student.bookAssigned?.length > 0
                ? student.bookAssigned.map(b => b.title).join(', ')
                : <span className="text-gray-400 italic">No book assigned</span>
        },
    ];

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
            <div className="max-w-2xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Viewing profile for {student.name}</p>
                </div>

                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    <div className='bg-gradient-to-r from-[#1E3A5F] to-[#2563EB] p-6 flex items-center gap-4'>
                        <div className='w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold'>
                            {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-white text-xl font-bold">{student.name}</h2>
                            <p className="text-white/70 text-sm">{student.rollNo}</p>
                        </div>
                    </div>

                    <div>
                        {rows.map(({ label, value }) => (
                            <div key={label} className="flex justify-between items-center px-6 py-4">
                                <span className="text-sm text-gray-500">{label}</span>
                                <span className="text-sm font-medium text-gray-800">{value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                        <Link to={`/editStudent/${student.id}`} className="px-5 py-2.5 rounded-xl text-sm font-medium bg-amber-50 text-amber-600 hover:bg-amber-100 transition">Edit</Link>

                        <Link to="/students" className="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">Back to Students</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadStudent