import axios from 'axios';l

export const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
};

export const getMe = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await axios.get('/api/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data.user;
    } catch {
        return null;
    }
};
