import { useEffect, useState } from 'react';
import { deleteStudent, getAllStudents } from '../../api/StudentApi';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');

    const fetchStudents = () => {
        getAllStudents()
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => { fetchStudents(); }, []);

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(search.toLowerCase())
    );

    const total = students.length;
    const passed = students.filter(s => s.marks >= 50).length;
    const failed = total - passed;
    const avg = total > 0 ? (students.reduce((sum, s) => sum + s.marks, 0) / total).toFixed(1) : '0.0';

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) {
            return;
        }

        deleteStudent(id)
            .then(() => fetchStudents())
            .catch(err => console.error(err));
    };

    const statCards = [
        { label: 'Total Students', value: total, from: 'from-blue-500', to: 'to-blue-700' },
        { label: 'Passed', value: passed, from: 'from-emerald-500', to: 'to-emerald-700' },
        { label: 'Failed', value: failed, from: 'from-red-500', to: 'to-red-700' },
        { label: 'Average Marks', value: avg, from: 'from-amber-400', to: 'to-amber-600' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Manage and view all students</p>
                    </div>
                    <Link to="/addStudent" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-xl transition duration-200 text-sm"> + Add Student</Link>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {statCards.map(({ label, value, from, to }) => (
                        <div key={label} className={`bg-gradient-to-br ${from} ${to} p-5 rounded-2xl shadow-sm text-white`}>
                            <p className="text-sm font-medium opacity-90">{label}</p>
                            <p className="text-3xl font-bold mt-1">{value}</p>
                        </div>
                    ))}
                </div>

                {/* Table card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    {/* Search */}
                    <div className="p-4 border-b border-gray-100">
                        <input type="text" placeholder="Search by name or roll no..." value={search} onChange={e => setSearch(e.target.value)} className="w-full sm:w-72 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50" />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="px-4 py-3 font-medium">#</th>
                                    <th className="px-4 py-3 font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">Roll No</th>
                                    <th className="px-4 py-3 font-medium">Marks</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Book Assigned</th>
                                    <th className="px-4 py-3 font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-10 text-gray-400">
                                            No students found
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((s, i) => (
                                        <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                                            <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                                            <td className="px-4 py-3 text-gray-600">{s.rollNo}</td>
                                            <td className="px-4 py-3 text-gray-600">{s.marks}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.marks >= 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                    {s.marks >= 50 ? 'PASS' : 'FAIL'} </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {s.bookAssigned?.length > 0
                                                    ? s.bookAssigned.map(b => b.title).join(', ')
                                                    : <span className="text-gray-400 italic">No book</span>
                                                }
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2 justify-center">
                                                    <Link to={`/readStudent/${s.id}`} className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium py-1.5 px-3 rounded-lg transition">View</Link>

                                                    <Link to={`/editStudent/${s.id}`} className="bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-medium py-1.5 px-3 rounded-lg transition">Edit</Link>

                                                    <button onClick={() => handleDelete(s.id)} className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium py-1.5 px-3 rounded-lg transition cursor-pointer">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default StudentDashboard;