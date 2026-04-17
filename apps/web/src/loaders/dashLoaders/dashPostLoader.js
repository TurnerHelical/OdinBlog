import { pagination } from '../../helpers/pagination';

async function myPostLoader({ request }) {
    try {
        const data = await pagination(request, `/posts/mine`, 1, 7);
        return data
    } catch (error) {

    }
}

export { myPostLoader };