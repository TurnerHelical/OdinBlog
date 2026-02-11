import { api } from './api.js';
import { setAccessToken } from './authState.js';

export async function refreshAccessToken() {
    const data = await api('http://localhost:3001/auth/refresh', {
        method: 'POST',
    });

    setAccessToken(data.accessToken);
    return data.accessToken;
}