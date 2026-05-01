import React, { useEffect, useState } from 'react'
import { getAllBooks } from '../../api/BookApi';
import { getAllStudents } from '../../api/StudentApi';
import { assignBook, unassignBook } from '../../api/AdminApi';
import { Link } from 'react-router-dom';

const AssignBook = () => {
    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignedBooks, setAssignedBooks] = useState([]);

    const [selectedBookId, setSelectedBookId] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [bookToUnassign, setBookToUnassign] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const bookRes = await getAllBooks();
            const studentRes = await getAllStudents();

            setBooks(bookRes.data);
            setStudents(studentRes.data);
            setAssignedBooks(bookRes.data.filter((b) => b.assignedTo !== null));
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault();

        try {
            await assignBook(selectedBookId, selectedStudentId);
            loadData();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    const handleUnAssign = async (e) => {
        e.preventDefault();

        try {
            await unassignBook(bookToUnassign);
            loadData();
        } catch (error) {
            console.error('Error unassigning book:', error);
        }
    };


    return (
        <>
            <div className="min-h-screen bg-[rgb(245,246,250)] text-white font-serif flex justify-center items-start p-10">

                <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-6xl space-y-10">

                    <h2 className="text-2xl font-bold text-center">Assign a Book</h2>
                    <form className="space-y-4" onSubmit={handleAssign}>
                        <select
                            value={selectedBookId}
                            onChange={(e) => setSelectedBookId(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">-- Select Book --</option>
                            {books
                                .filter((b) => b.isActive && b.assignedTo === null)
                                .map((book) => (
                                    <option key={book.id} value={book.id}>
                                        {book.title}
                                    </option>
                                ))}
                        </select>

                        <select
                            value={selectedStudentId}
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">-- Select Student --</option>
                            {students
                                .filter((s) => s.status === 1)
                                .map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}
                        </select>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
                            Assign Book
                        </button>
                    </form>

                    <hr />

                    <h2 className="text-2xl font-bold text-center">Unassign a Book</h2>
                    <form className="space-y-4" onSubmit={handleUnAssign}>
                        <select
                            value={bookToUnassign}
                            onChange={(e) => setBookToUnassign(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">-- Select Assigned Book --</option>
                            {assignedBooks.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>

                        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 cursor-pointer">
                            Unassign Book
                        </button>
                        
                        <div className='flex justify-center items-center'>
                            <Link to={'/dashboard'} type="submit" className="px-6 py-2 mx-2 flex justify-center max-w-50 items-center rounded-xl text-lg bg-gray-600 text-white hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#8b5cf6] hover:text-white transition">
                                cancel
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default AssignBook