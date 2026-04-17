import { pagination } from '../../helpers/pagination';

async function commentLoader({ request }) {
    try {
        const data = await pagination(request, '/comments/mine', 1, 7);
        return data
    } catch (error) {

    }
}

export { commentLoader };