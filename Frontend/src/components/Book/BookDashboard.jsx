import React, { useEffect, useState } from 'react'
import { deleteBook, getAllBooks } from '../../api/BookApi';
import { Link } from 'react-router-dom';

const BookDashboard = () => {
    const [books, setbooks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        getAllBooks()
            .then((res) => {
                setbooks(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch book:", err);
            })
    }, []);

    const handleDelete = async (id) => {
        deleteBook(id)
            .then(() => {
                location.reload();
            }).catch((err) => {
                console.error("Failed to fetch book:", err);
            });
    };

    return (
        <>

            <div className="flex-1 overflow-y-auto p-6 bg-[rgb(245,246,250)]">
                <div className='bg-white bg-opacity-90 p-6 rounded-md shadow-md max-w-6xl mx-auto '>
                    <h1 className='text-3xl font-bold text-center mb-6 text-black font-serif'>Available Books</h1>

                    <input className='w-full p-2 border rounded mb-4 font-serif focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" placeholder='Search by name or roll no' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <div className='flex justify-end'>
                        <Link to={'/addBook'} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-2 rounded font-serif"> create+ </Link>
                    </div>

                    <table className='w-full text-left border mt-3'>
                        <thead>
                            <tr className='bg-[#4FA4FF] p-2 font-serif'>
                                <th className='p-2 border'>Title</th>
                                <th className='p-2 border'>Author</th>
                                <th className='p-2 border'>Genre</th>
                                <th className='p-2 border'>Published At</th>
                                <th className='p-2 border'>AssignedTo</th>
                                <th className='p-2 border w-2'>Actions</th>
                            </tr>
                        </thead>
                        {books.map((b) => (
                            <tbody>
                                <tr key={b.id} className='hover:bg-gray-50 font-serif'>
                                    <td className='p-2 border'>{b.title}</td>
                                    <td className='p-2 border'>{b.author}</td>
                                    <td className='p-2 border'>{b.genre}</td>
                                    <td className='p-2 border'>{b.publishedAt}</td>
                                    <td className='p-2 border'>{b.assignedTo}</td>
                                    <td className="p-2 border flex gap-2 justify-center">
                                        <Link to={`/readBook/${b.id}`} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-200 shadow-sm">
                                            Read
                                        </Link>
                                        <Link to={`/editBook/${b.id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-200 shadow-sm">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(b.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-200 shadow-sm cursor-pointer">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}

export default BookDashboard
