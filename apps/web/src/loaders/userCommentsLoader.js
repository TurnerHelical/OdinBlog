import { api } from '../helpers/apiHelper';

async function userCommentsLoader({ params }) {
    try {
        const userId = params.userId;
        const comments = await api({ url: `/users/${userId}/comments` });
        return comments;
    } catch (error) {

    }
}

export { userCommentsLoader };