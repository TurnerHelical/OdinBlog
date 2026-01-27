import { getPosts } from '../scripts/postScripts';


export async function homeLoader() {
    const posts = await getPosts();
    return posts
}
