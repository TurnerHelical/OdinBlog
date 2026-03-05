import { api } from '../helpers/apiHelper';

async function homeLoader() {
    const posts = await api({ url: '/posts' });
    return posts;
}

export { homeLoader };