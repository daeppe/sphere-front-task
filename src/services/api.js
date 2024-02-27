import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sphere-back-task.onrender.com/api'
});

export default api;