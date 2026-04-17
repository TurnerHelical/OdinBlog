import { pagination } from '../helpers/pagination';

async function userCommentsLoader({ params, request }) {
    try {
        const userId = params.userId;
        const data = await pagination(request, `/users/${userId}/comments`, 1, 10);
        return data;
    } catch (error) {

    }
}

export { userCommentsLoader };