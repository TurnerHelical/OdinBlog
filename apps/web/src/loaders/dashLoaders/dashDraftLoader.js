import { pagination } from '../../helpers/pagination';

async function draftLoader({ request }) {
    try {
        const data = await pagination(request, '/posts/drafts', 1, 7);
        console.log(data);
        return data
    } catch (err) {

    }
}

export { draftLoader };