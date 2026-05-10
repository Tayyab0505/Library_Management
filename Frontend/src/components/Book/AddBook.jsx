import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addBook } from '../../api/BookApi';

const AddBook = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: '', author: '', genre: '', publishedAt: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await addBook(form);
            if (res.data.message === 'Data saved successfully') {
                setIsError(false);
                setMessage('Book added successfully!');
                setTimeout(() => navigate('/books'), 1500);
            } else {
                setIsError(true);
                setMessage(res.data.message);
            }
        } catch {
            setIsError(true);
            setMessage('Something went wrong.');
        }
    };

    const fields = [
        { label: 'Title', name: 'title', type: 'text', placeholder: 'The Great Gatsby' },
        { label: 'Author', name: 'author', type: 'text', placeholder: 'F. Scott Fitzgerald' },
        { label: 'Genre', name: 'genre', type: 'text', placeholder: 'Fiction' },
        { label: 'Published At', name: 'publishedAt', type: 'date', placeholder: '' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
            <div className="max-w-2xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Add New Book</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Fill in the details to add a book to the library</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {message && (
                        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleAdd} className="flex flex-col gap-4">
                        {fields.map(({ label, name, type, placeholder }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    placeholder={placeholder}
                                    required
                                    value={form[name]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                            </div>
                        ))}

                        <div className="flex justify-end gap-3 mt-2">
                            <Link to="/books"
                                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                                Cancel
                            </Link>
                            <button type="submit"
                                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBook;