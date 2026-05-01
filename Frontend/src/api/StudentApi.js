import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});


export const addStudent = (data) => API.post("/addStudent", data);
export const editStudent = (id, data) => API.put(`/updateStudents/${id}`, data);
export const findById = (id) => API.get(`/findByID/${id}`);
export const getAllStudents = () => API.get("/findAllStudents");
export const deleteStudent = (id) => API.delete(`/deleteStudent/${id}`);