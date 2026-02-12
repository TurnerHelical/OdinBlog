import { api } from '../lib/api.js';

function normalizeProfile(raw) {
    if (raw?.user) return raw

    return {
        user: raw,
    };
}


export async function profileLoader({ params }) {
    if (params.userId) {
        const raw = await api(`http://localhost:3001/users/${params.userId}`, { method: 'GET' });
        console.log(raw)
        return { profile: raw.user ?? raw, isMe: false };
    }

    const raw = await api('http://localhost:3001/users/me', { method: 'GET' });
    console.log(raw)
    return { profile: raw.user ?? raw, isMe: true };

}