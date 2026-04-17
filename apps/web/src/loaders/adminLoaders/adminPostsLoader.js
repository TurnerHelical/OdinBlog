import { pagination } from '../../helpers/pagination';

async function adminPostsLoader({ request }) {
    try {
        const data = await pagination(request, '/posts', 1, 10);
        return data;
    } catch (error) {

    }
}

export { adminPostsLoader };