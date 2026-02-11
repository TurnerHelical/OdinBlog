import { api } from '../lib/api.js';

function normalizeProfile(raw) {
    if (raw?.user) return raw

    return {
        user: raw,
    };
}


export async function profileLoader({ params }) {
    const { userId } = params;

    const raw = userId
        ? await api(`http://localhost:3001/users/${userId}`, { method: "GET" })
        : await api("http://localhost:3001/users/me", { method: "GET" });

    const profile = normalizeProfile(raw);

    return profile;
}