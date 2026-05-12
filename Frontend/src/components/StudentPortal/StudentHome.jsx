import { useEffect, useState } from 'react';
import { getAllBooks } from '../../api/BookApi';
import { getAllStudents } from '../../api/StudentApi';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from 'react-router-dom';

const StudentHome = () => {
    const [myBooks, setMyBooks] = useState([]);
    const [totalAvailable, setTotalAvailable] = useState(0);
    const [loading, setLoading] = useState(true);

    const studentName = localStorage.getItem('studentName') || 'Student';
    const studentEmail = localStorage.getItem('studentEmail');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookRes, studentRes] = await Promise.all([
                    getAllBooks(),
                    getAllStudents()
                ]);

                const allBooks = bookRes.data;
                const allStudents = studentRes.data;

                const me = allStudents.find(s => s.email === studentEmail);

                if (me) {
                    const assigned = allBooks.filter(b => b.assignedTo === me.id);
                    setMyBooks(assigned);
                }

                setTotalAvailable(allBooks.filter(b => !b.assignedTo).length);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const statCards = [
        {
            label: 'Books I have',
            value: myBooks.length,
            icon: <MenuBookIcon />,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-l-blue-600',
        },
        {
            label: 'Available in library',
            value: totalAvailable,
            icon: <LibraryBooksIcon />,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-l-emerald-600',
        },
    ];

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
            <div className="max-w-5xl mx-auto">

                <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2563EB] rounded-2xl p-8 mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-white text-2xl font-bold">Welcome, {studentName}</h2>
                        <p className="text-white/70 text-sm mt-1">Here's your library overview</p>
                    </div>
                    <Link to="/browse-books" className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition no-underline">
                        Browse Books →
                    </Link>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    {statCards.map(({ label, value, icon, color, bg, border }) => (
                        <div key={label} className={`bg-white rounded-2xl p-6 border border-gray-100 border-l-4 ${border} flex items-center gap-4 shadow-sm`}>
                            <div className={`${bg} ${color} rounded-xl p-3 flex items-center justify-center`}>
                                {icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 m-0">{label}</p>
                                <p className="text-4xl font-bold text-gray-900 m-0 leading-tight">
                                    {loading ? '—' : value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* My books table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-base font-semibold text-gray-800">My borrowed books</h3>
                    </div>

                    {loading ? (
                        <p className="text-center py-10 text-gray-400 text-sm">Loading...</p>
                    ) : myBooks.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-sm">You have no books assigned yet.</p>
                            <Link to="/browse-books"
                                className="text-blue-600 text-sm underline mt-2 inline-block">
                                Browse available books
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="px-4 py-3 font-medium">#</th>
                                        <th className="px-4 py-3 font-medium">Title</th>
                                        <th className="px-4 py-3 font-medium">Author</th>
                                        <th className="px-4 py-3 font-medium">Genre</th>
                                        <th className="px-4 py-3 font-medium">Published</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myBooks.map((b, i) => (
                                        <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                                            <td className="px-4 py-3 font-medium text-gray-800">{b.title}</td>
                                            <td className="px-4 py-3 text-gray-600">{b.author}</td>
                                            <td className="px-4 py-3 text-gray-600">{b.genre}</td>
                                            <td className="px-4 py-3 text-gray-600">{b.publishedAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentHome;