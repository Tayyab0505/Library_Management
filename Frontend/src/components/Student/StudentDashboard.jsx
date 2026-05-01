import React, { useEffect, useState } from 'react'
import { deleteStudent, getAllStudents } from '../../api/StudentApi';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        getAllStudents()
            .then((res) => {
                setStudents(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch students:", err);
            })
    }, []);

    const filtered = students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(search.toLowerCase())
    );

    const total = students.length;
    const passed = students.filter((s) => s.marks >= 50).length;
    const failed = total - passed;
    const avg = (students.reduce((sum, s) => sum + s.marks, 0) / total).toFixed(1);

    const handleDelete = (id) => {
        deleteStudent(id)
            .then(() => {
                location.reload();
            }).catch((err) => console.error(err));
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto p-6 bg-[#F5F6FA]">
                <div className="bg-white bg-opacity-90 p-6 rounded-md shadow-md max-w-6xl mx-auto">
                    {/* Page Title */}
                    <h1 className="font-serif font-bold text-3xl text-center mb-6 text-[#000000]">
                        Student Result System
                    </h1>

                    {/* Search + Create Row */}
                    <div className="flex justify-between items-center mb-6">
                        {/* Search Bar */}
                        <input
                            className="font-serif font-bold w-1/3 p-2 border rounded text-grey bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="Search by name or roll no"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* Create Button */}
                        <Link
                            to={'/addStudent'}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200"
                        >
                            Create +
                        </Link>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Total */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-lg shadow-lg text-white">
                            <h3 className="text-lg font-semibold">Total Students</h3>
                            <p className="text-2xl font-bold">{total}</p>
                        </div>

                        {/* Pass */}
                        <div className="bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-lg shadow-lg text-white">
                            <h3 className="text-lg font-semibold">Passed</h3>
                            <p className="text-2xl font-bold">{passed}</p>
                        </div>

                        {/* Fail */}
                        <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-lg shadow-lg text-white">
                            <h3 className="text-lg font-semibold">Failed</h3>
                            <p className="text-2xl font-bold">{failed}</p>
                        </div>

                        {/* Average */}
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-lg shadow-lg text-white">
                            <h3 className="text-lg font-semibold">Average Marks</h3>
                            <p className="text-2xl font-bold">{avg}</p>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="font-serif w-full text-left border">
                        <thead>
                            <tr className="bg-[#4FA4FF] p-2">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Roll No</th>
                                <th className="p-2 border">Marks</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Book</th>
                                <th className="p-2 border w-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50">
                                    <td className="p-2 border">{s.name}</td>
                                    <td className="p-2 border">{s.rollNo}</td>
                                    <td className="p-2 border">{s.marks}</td>
                                    <td className="p-2 border">
                                        <span
                                            className={`px-2 py-1 rounded font-serif font-bold text-white text-sm ${s.marks >= 50 ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        >
                                            {s.marks >= 50 ? "PASS" : "FAIL"}
                                        </span>
                                    </td>
                                    <td className="p-2 border">
                                        {s.bookAssigned && s.bookAssigned.length > 0 ? (
                                            s.bookAssigned.map((b) => b.title).join(", ")
                                        ) : (
                                            <span className="text-gray-500">No Book</span>
                                        )}
                                    </td>
                                    <td className="p-2 border flex gap-2 justify-center">
                                        <Link
                                            to={`/readStudent/${s.id}`}
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-200 shadow-sm"
                                        >
                                            Read
                                        </Link>
                                        <Link
                                            to={`/editStudent/${s.id}`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-200 shadow-sm"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(s.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-200 shadow-sm cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default StudentDashboard