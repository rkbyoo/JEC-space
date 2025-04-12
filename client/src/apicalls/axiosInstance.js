import axios from 'axios';
export const axiosInstance=axios.create({
    baseURL: 'http://localhost:5000/api', // or your actual API URL
    withCredentials: true, // This enables cookie support
    headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    },
})

export default axiosInstance;