import { useEffect, useState } from 'react';
import { getAllBooks } from '../../api/BookApi';

const BrowseBooks = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllBooks()
            .then(res => setBooks(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = books.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase()) ||
        b.genre.toLowerCase().includes(search.toLowerCase())
    );

    const available = books.filter(b => !b.assignedTo).length;

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Browse Books</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {available} books available in the library
                    </p>
                </div>

                {/* SearchBar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5">
                    <div className="p-4">
                        <input type="text" placeholder="Search by title, author or genre..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
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
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 text-gray-400">Loading...</td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 text-gray-400">No books found</td>
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
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.assignedTo ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {b.assignedTo ? 'Not Available' : 'Available'}
                                                </span>
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

export default BrowseBooks;