import axios from "axios";
const BASE_URL = "http://localhost:1513/todos";

export const fetchTodos = () => axios.get(BASE_URL);
export const createTodo = (text: string) => axios.post(BASE_URL, { text });
export const updateTodo = (id: string, text: string) =>
  axios.patch(`${BASE_URL}/${id}`, { text });
export const deleteTodo = (id: string) =>
  axios.delete(`${BASE_URL}/${id}`);
