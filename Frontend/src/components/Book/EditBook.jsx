import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findByID, updateBook } from '../../api/BookApi';
import "../../App.css";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publishedAt, setPublishedAt] = useState('');

    const [logStatus, setLogStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    useEffect(() => {
        findByID(id)
            .then((res) => {
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setGenre(res.data.genre);
                setPublishedAt(res.data.publishedAt);
            }).catch(err => {
                console.error("Failed to fetch student:", err);
            });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedBook = {
            title,
            author,
            genre,
            publishedAt
        }

        updateBook(id, updatedBook)
            .then((res) => {
                if (res.data.message === 'Book updated successfuly') {
                    setLogStatus(res.data.message);
                    navigate('/books');
                };
            }).catch((err) => {
                console.log('Error fetching', err);
            })
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
            <div className="hero min-h-screen bg-[rgb(245,246,250)] overflow-y-auto py-10 px-4 flex items-start justify-center font-serif">

                <div className="w-full sm:w-[90%] lg:w-[97%] bg-gray-800 text-white rounded-lg shadow-lg">

                    <div className="heading text-center">
                        <h1 className="my-5 text-3xl sm:text-4xl font-bold">Update Book</h1>
                    </div>

                    <form className="p-5" onSubmit={handleUpdate}>
                        <div className="initials flex md:flex-row flex-col justify-evenly gap-4">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="title" className="text-xl mb-1">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="author" className="text-xl mb-1">
                                    Author:
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    placeholder="Author"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="Genre" className="text-xl mb-1">
                                    Genre:
                                </label>
                                <input
                                    type="text"
                                    name="genre"
                                    id="genre"
                                    placeholder="Genre"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="initials flex md:flex-row flex-col ml-11 mt-5">

                            <div className="flex flex-col mb-3">
                                <label htmlFor="publishedAt" className="text-xl mb-1">
                                    Published At:
                                </label>
                                <input
                                    type="date"
                                    name="publishedAt"
                                    id="publishedAt"
                                    className="w-full md:w-[300px] px-4 py-2 rounded-xl border"
                                    required
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                />
                            </div>
                        </div>

                        <span className={statusHolder}>{logStatus}</span>

                        <div className="mt-6 flex justify-end">
                            <Link to={'/books'}
                                type="submit"
                                className="px-6 py-2 mx-2 rounded-xl text-xl bg-black text-white hover:text-black hover:bg-white hover:font-bold hover:shadow-xl"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="cursor-pointer px-6 py-2 rounded-xl text-xl bg-black text-white hover:text-black hover:bg-white hover:font-bold hover:shadow-xl"
                            >
                                Update
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditBook
