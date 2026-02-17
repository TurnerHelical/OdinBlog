import { redirect } from 'react-router';
import { api } from '../lib/api.js';

export async function requireAuth({ request }) {
    try {
        const me = await api('http://localhost:3001/users/me', { method: 'GET' });
        return me;
    } catch (err) {
        const from = request ? new URL(request.url).pathname : '/';
        throw redirect(`/login?from=${encodeURIComponent(from)}`);
    }
}