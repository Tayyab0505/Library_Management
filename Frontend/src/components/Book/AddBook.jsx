import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { addBook } from '../../api/BookApi';
import "../../App.css";

const AddBook = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [publishedAt, setPublishedAt] = useState('')

    const [logStatus, setLogStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const handleAdd = async (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            genre,
            publishedAt
        };

        try {
            const res = await addBook(newBook);

            if (res.data.message === 'Data saved successfully') {
                setLogStatus(res.data.message);
                setTitle('');
                setAuthor('');
                setGenre('');
                setPublishedAt('');
            }

        } catch (error) {
            console.error('Failed to add student:', error);
        }
    }

    useEffect(() => {
        if (logStatus !== '') {
            setStatusHolder('showMessage');
            const timer = setTimeout(() => {
                setStatusHolder('message');
                setLogStatus('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [logStatus]);


    return (
        <>
            <div className="hero min-h-screen bg-[rgb(245,246,250)] overflow-y-auto py-10 px-4 flex items-start font-serif justify-center">

                <div className="w-full h-120 sm:w-[90%] lg:w-[95%] bg-gray-800 text-white rounded-lg shadow-lg">
                    <div className="heading text-center">
                        <h1 className="my-5 text-3xl sm:text-4xl font-bold text-[#60a5fa] font-serif">Add New Book</h1>
                    </div>

                    <form className="p-5" onSubmit={handleAdd}>
                        <div className="initials flex md:flex-row flex-col justify-evenly gap-4">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="title" className="text-xl mb-1 font-serif">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter Title"
                                   className="w-full font-serif md:w-[300px] px-4 py-2 rounded-xl border border-gray-600 bg-gray-700  focus:outline-none focus:border-[#60a5fa]"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="author" className="text-xl mb-1  font-serif">
                                    Author:
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    placeholder="Enter Author Name"
                                    className="w-full font-serif md:w-[300px] px-4 py-2 rounded-xl border border-gray-600 bg-gray-700 focus:outline-none focus:border-[#60a5fa]"
                                    required
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="genre" className="text-xl mb-1 font-serif">
                                    Genre:
                                </label>
                                <input
                                    type="text"
                                    name="genre"
                                    id="genre"
                                    placeholder="Enter Genre"
                                    className="w-full font-serif md:w-[300px] px-4 py-2 rounded-xl border border-gray-600 bg-gray-700 focus:outline-none focus:border-[#60a5fa]"
                                    required
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="initials flex md:flex-row flex-col ml-10 mt-5">

                            <div className="flex flex-col mb-3">
                                <label htmlFor="publishedAt" className="text-xl mb-1 font-serif">
                                    Published At:
                                </label>
                                <input
                                    type="date"
                                    name="publishedAt"
                                    id="publishedAt"
                                    className="w-full font-serif md:w-[300px] px-4 py-2 rounded-xl border border-gray-600 bg-gray-700 focus:outline-none focus:border-[#60a5fa]"
                                    required
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                />
                            </div>
                        </div>
                        <span className={statusHolder}>{logStatus}</span>

                        <div className="mt-20 flex justify-end">
                            <Link to={'/books'}
                                type="submit"
                                className="px-6 py-2 mx-2 rounded-xl text-lg bg-gray-600 text-white hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#8b5cf6] hover:text-white transition"
                            >
                                go back
                            </Link>

                            <button
                                type="submit"
                                className="px-6 py-2 rounded-xl text-lg bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-bold hover:from-[#2563eb] hover:to-[#7c3aed] transition"
                            >
                                Add
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddBook
