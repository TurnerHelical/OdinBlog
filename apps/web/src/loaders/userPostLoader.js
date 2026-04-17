import { pagination } from '../helpers/pagination';

async function userPostLoader({ params, request }) {
    try {
        const userId = params.userId;
        const data = await pagination(request, `/users/${userId}/posts`, 1, 7);

        return data;
    } catch (error) {

    }
}

export { userPostLoader };