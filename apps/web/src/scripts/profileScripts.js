import { api } from '../lib/api.js'

export async function getProfile(id) {
    const profile = await api(`http://localhost:3001/${id}`);
    return profile
}