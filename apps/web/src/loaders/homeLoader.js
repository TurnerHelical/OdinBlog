import { api } from '../helpers/apiHelper';

async function homeLoader({ request }) {
    const url = new URL(request.url);
    let pageNumber = Number(url.searchParams.get('page'));
    let limit = Number(url.searchParams.get('limit'));
    if (!limit) limit = 5;
    if (!pageNumber) pageNumber = 1;
    const dbData = await api({ url: `/posts?page=${pageNumber}&limit=${limit}` });

    const totalPosts = dbData.totalPosts;

    const pages = Math.ceil(totalPosts / limit);

    const posts = dbData.posts;
    const data = { pages, pageNumber, posts };
    return data;
}

export { homeLoader };