import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { findByID } from '../../api/BookApi';

const ReadBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    findByID(id)
      .then((res) => {
        setBook(res.data);
      }).catch(err => console.log(err));

  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  };

  const rows = [
    { label: 'Title', value: book.title },
    { label: 'Author', value: book.author },
    { label: 'Genre', value: book.genre },
    { label: 'Published At', value: book.publishedAt },
  ];


  return (
    <div className="min-h-screen bg-[#F5F6FA] p-6 font-serif">
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Book Details</h1>
          <p className="text-sm text-gray-500 mt-0.5">Viewing details for "{book.title}"</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2563EB] p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
              {book.title.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">{book.title}</h2>
              <p className="text-white/70 text-sm">by {book.author}</p>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center px-6 py-4">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <Link to={`/editBook/${book.id}`} className="px-5 py-2.5 rounded-xl text-sm font-medium bg-amber-50 text-amber-600 hover:bg-amber-100 transition">Edit</Link>

            <Link to="/books" className="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">Back to Books</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBook
