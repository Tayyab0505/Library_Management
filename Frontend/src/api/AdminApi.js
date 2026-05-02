import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const AdminLogin = (data) => API.post("/loginAdmin", data);
export const assignBook = (bookId, studentId) => {
    const email = localStorage.getItem('adminEmail');
    return API.put("/assign", { bookId, studentId, email });
}

export const unassignBook = (bookId) => {
    const email = localStorage.getItem('adminEmail');
    return API.put("/unassign", { bookId, email });
};