import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { findByID } from '../../api/BookApi';

const ReadBook = () => {

  const { id } = useParams();
  const [book, setBook] = useState('');

  useEffect(() => {
    findByID(id)
      .then((res) => {
        setBook(res.data);
      }).catch(err => console.log(err));

  }, [id])


  return (
    <>
      <div className="hero min-h-screen bg-gradient-to-br bg-[rgb(245,246,250)] overflow-y-auto py-10 px-4 flex items-start justify-center">

        <div className="w-full sm:w-[90%] lg:w-[82%] bg-gray-800 text-white rounded-lg shadow-lg">

          <div className="heading text-center">
            <h1 className="my-5 text-3xl sm:text-4xl font-bold text-[#60a5fa] font-serif">Read Book</h1>
          </div>

          {book && (
            <div>
              <h3 className='my-5 mx-5 text-2xl font-bold font-serif'>Title: {book.title}</h3>
              <h3 className='my-5 mx-5 text-2xl font-bold font-serif'>Author: {book.author}</h3>
              <h3 className='my-5 mx-5 text-2xl font-bold font-serif'>Genre: {book.genre}</h3>
              <h3 className='my-5 mx-5 text-2xl font-bold font-serif'>Published At: {book.publishedAt}</h3>
            </div>
          )}

          <div className="mt-6 flex justify-end mr-4">
            <Link to={'/books'}
              type="submit"
              className="px-6 py-2 font-serif mb-4 rounded-xl text-lg bg-gray-600 text-white hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#8b5cf6] hover:text-white transition"
            >
              back
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default ReadBook
