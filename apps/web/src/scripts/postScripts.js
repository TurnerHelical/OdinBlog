import { api } from '../lib/api.js'

export async function getPosts() {
    const posts = await api('http://localhost:3001/posts', { method: 'GET' });
    return posts;
};