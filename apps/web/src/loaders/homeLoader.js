import { pagination } from '../helpers/pagination';

async function homeLoader({ request }) {
    try {

        const data = await pagination(request, '/posts', 1, 5);
        return data;
    } catch (error) {

    }
}

export { homeLoader };