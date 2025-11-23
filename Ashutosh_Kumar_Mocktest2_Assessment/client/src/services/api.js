export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
};

export const fetchUser = async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
};
