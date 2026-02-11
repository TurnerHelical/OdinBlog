import { api } from "../lib/api";


export async function homeLoader() {
    const posts = await api('http://localhost:3001/posts', { method: 'GET' });
    return posts
};

