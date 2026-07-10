import axios from 'axios';

// Membuat instance Axios terpusat
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // URL server backend Express kita
    withCredentials: true, // PENTING: Wajib true agar browser mengirimkan HTTP-Only cookie saat hit API
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
