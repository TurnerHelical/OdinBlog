import { refreshAccessToken } from '../lib/authApi.js';
import { api } from '../lib/api.js';

export async function rootLoader() {
    try {
        await refreshAccessToken();
    } catch {

    }

    try {
        const me = await api('http://localhost:3001/users/me', { method: 'GET' });
        const user = me?.user ?? me;
        return { user };
    } catch {
        return { user: null };
    }
};