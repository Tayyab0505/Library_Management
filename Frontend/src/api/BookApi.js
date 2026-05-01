import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const addBook = (data) => API.post("/addBook", data);
export const updateBook = (id, data) => API.put(`/updateBook/${id}`, data);
export const findByID = (id) => API.get(`/findByIdBook/${id}`);
export const getAllBooks = () => API.get("/findAllBooks");
export const deleteBook = (id) => API.delete(`/deleteBook/${id}`);