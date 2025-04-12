import axios from 'axios';
export const axiosInstance=axios.create({
    baseURL: '/api', // or your actual API URL
    withCredentials: true, // This enables cookie support
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance;