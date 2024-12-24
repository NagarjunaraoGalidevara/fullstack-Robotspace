import axios from "axios";

// const URL = "http://localhost:3000";
const URL = "https://backend-robotspace.onrender.com"

export const fetchTasks = () => axios.get(`${URL}/tasks`);
export const addTask = (task) => axios.post(`${URL}/tasks`, task);
export const updateTask = (id, task) => axios.patch(`${URL}/tasks/${id}`, task);
export const deleteTask = (id) => axios.delete(`${URL}/tasks/${id}`);
