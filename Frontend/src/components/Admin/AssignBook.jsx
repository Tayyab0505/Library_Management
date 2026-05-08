import { useEffect, useState } from 'react';
import { getAllBooks } from '../../api/BookApi';
import { getAllStudents } from '../../api/StudentApi';
import { assignBook, unassignBook } from '../../api/AdminApi';

const AssignBook = () => {
    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignedBooks, setAssignedBooks] = useState([]);

    const [selectedBookId, setSelectedBookId] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [bookToUnassign, setBookToUnassign] = useState('');

    const [assignMsg, setAssignMsg] = useState('');
    const [assignError, setAssignError] = useState(false);
    const [unassignMsg, setUnassignMsg] = useState('');
    const [unassignError, setUnassignError] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [bookRes, studentRes] = await Promise.all([getAllBooks(), getAllStudents()]);
            setBooks(bookRes.data);
            setStudents(studentRes.data);
            setAssignedBooks(bookRes.data.filter(b => b.assignedTo !== null));
        } catch (err) {
            console.error('Error loading data:', err);
        }
    };

    const showMsg = (setter, errorSetter, msg, isError) => {
        setter(msg);
        errorSetter(isError);
        setTimeout(() => setter(''), 3000);
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            const res = await assignBook(selectedBookId, selectedStudentId);
            if (res.data.message === 'Book successfully assigned') {
                showMsg(setAssignMsg, setAssignError, 'Book assigned successfully!', false);
                setSelectedBookId('');
                setSelectedStudentId('');
                loadData();
            } else {
                showMsg(setAssignMsg, setAssignError, res.data.message, true);
            }
        } catch {
            showMsg(setAssignMsg, setAssignError, 'Something went wrong.', true);
        }
    };

    const handleUnassign = async (e) => {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to unassign this book?')) {
            return;
        }

        try {
            const res = await unassignBook(bookToUnassign);
            if (res.data.message === 'Book successfully unassigned') {
                showMsg(setUnassignMsg, setUnassignError, 'Book unassigned successfully!', false);
                setBookToUnassign('');
                loadData();
            } else {
                showMsg(setUnassignMsg, setUnassignError, res.data.message, true);
            }
        } catch {
            showMsg(setUnassignMsg, setUnassignError, 'Something went wrong.', true);
        }
    };

    const availableBooks = books.filter(b => b.isActive && b.assignedTo === null);
    const activeStudents = students.filter(s => s.status === 1 && s.roleId === 2);

    const selectClass = "w-full cursor-pointer px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent";

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
            <div className="max-w-3xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Assign Books</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Assign or unassign books to students</p>
                </div>

                {/* Assign section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                            <span className="text-blue-600 text-lg font-bold">+</span>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-gray-800">Assign a book</h2>
                            <p className="text-xs text-gray-400">Select an available book and a student</p>
                        </div>
                    </div>

                    {assignMsg && (
                        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${assignError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                            {assignMsg}
                        </div>
                    )}

                    <form onSubmit={handleAssign} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Book</label>
                            <select value={selectedBookId} onChange={e => setSelectedBookId(e.target.value)} className={selectClass}
                                required>
                                <option value="">-- Select available book --</option>
                                {availableBooks.length === 0 ? <option disabled>No available books</option>
                                    : availableBooks.map(b => (
                                        <option key={b.id} value={b.id}>{b.title} — {b.author}</option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
                            <select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)} className={selectClass}
                                required>
                                <option value="">-- Select student --</option>
                                {activeStudents.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} — {s.rollNo}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="w-full cursor-pointer py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">Assign Book</button>
                    </form>
                </div>

                {/* Unassign section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                            <span className="text-red-500 text-lg font-bold">−</span>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-800">Unassign a book</h2>
                            <p className="text-xs text-gray-400">Return a book from a student</p>
                        </div>
                    </div>

                    {unassignMsg && (
                        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${unassignError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                            {unassignMsg}
                        </div>
                    )}

                    <form onSubmit={handleUnassign} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Assigned Book</label>
                            <select value={bookToUnassign} onChange={e => setBookToUnassign(e.target.value)} className={selectClass}
                                required>
                                <option value="">-- Select assigned book --</option>
                                {assignedBooks.length === 0 ? <option disabled>No books currently assigned</option>
                                    : assignedBooks.map(b => (
                                        <option key={b.id} value={b.id}>{b.title} — {b.author}</option>
                                    ))}
                            </select>
                        </div>

                        <button type="submit" className="w-full cursor-pointer py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition">Unassign Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignBook;