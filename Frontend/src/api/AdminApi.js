import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});


export const AdminLogin = (data) => API.post("/loginAdmin", data);
export const assignBook = (bookId, studentId) => API.put("/assign", { bookId, studentId, email: "admin@gmail.com" });
export const unassignBook = (bookId) => API.put("/unassign", { bookId, email: "admin@gmail.com" });