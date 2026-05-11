import { useEffect, useState } from 'react';
import { deleteBook, getAllBooks } from '../../api/BookApi';
import { Link } from 'react-router-dom';

const BookDashboard = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');

    const fetchBooks = () => {
        getAllBooks()
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => { fetchBooks(); }, []);

    const filtered = books.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
    );

    const total = books.length;
    const assigned = books.filter(b => b.assignedTo).length;
    const available = total - assigned;

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        deleteBook(id).then(fetchBooks).catch(console.error);
    };

    const statCards = [
        { label: 'Total Books', value: total, from: 'from-blue-500', to: 'to-blue-700' },
        { label: 'Available', value: available, from: 'from-emerald-500', to: 'to-emerald-700' },
        { label: 'Assigned', value: assigned, from: 'from-amber-400', to: 'to-amber-600' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Books</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Manage your library collection</p>
                    </div>
                    <Link to="/addBook" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-xl transition text-sm">+ Add Book</Link>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {statCards.map(({ label, value, from, to }) => (
                        <div key={label} className={`bg-gradient-to-br ${from} ${to} p-5 rounded-2xl shadow-sm text-white`}>
                            <p className="text-sm font-medium opacity-90">{label}</p>
                            <p className="text-3xl font-bold mt-1">{value}</p>
                        </div>
                    ))}
                </div>

                {/* Table card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full sm:w-72 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="px-4 py-3 font-medium">#</th>
                                    <th className="px-4 py-3 font-medium">Title</th>
                                    <th className="px-4 py-3 font-medium">Author</th>
                                    <th className="px-4 py-3 font-medium">Genre</th>
                                    <th className="px-4 py-3 font-medium">Published</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-10 text-gray-400">
                                            No books found
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((b, i) => (
                                        <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                                            <td className="px-4 py-3 font-medium text-gray-800">{b.title}</td>
                                            <td className="px-4 py-3 text-gray-600">{b.author}</td>
                                            <td className="px-4 py-3 text-gray-600">{b.genre}</td>
                                            <td className="px-4 py-3 text-gray-600">{b.publishedAt}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.assignedTo ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {b.assignedTo ? 'Assigned' : 'Available'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2 justify-center">
                                                    <Link to={`/readBook/${b.id}`}
                                                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium py-1.5 px-3 rounded-lg transition">
                                                        View
                                                    </Link>
                                                    <Link to={`/editBook/${b.id}`}
                                                        className="bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-medium py-1.5 px-3 rounded-lg transition">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDelete(b.id)}
                                                        className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium py-1.5 px-3 rounded-lg transition cursor-pointer">
                                                        Delete
                                                    </button>
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
        </div>
    );
};

export default BookDashboard;