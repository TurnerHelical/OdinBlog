import { api } from '../helpers/apiHelper';

async function homeLoader() {
    const posts = await api({ url: '/posts' });
    console.log(posts);
    return posts;
}

export { homeLoader };