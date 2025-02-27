import axios from "axios";

export const register = (data) => axios.post("http://localhost:5000/api/auth/register", data);
export const login = (data) => axios.post("http://localhost:5000/api/auth/login", data);
