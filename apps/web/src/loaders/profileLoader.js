import { api } from '../lib/api.js';
import { getAccessToken } from '../lib/authState.js';

export async function profileLoader() {
    try {
        const profile = await api(`http://localhost:3001/users/me`, { method: 'GET' });
        return profile;

    } catch (err) {
        throw new Response('Unauthorized', { status: 401 });
    }

}