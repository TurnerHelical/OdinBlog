import { pagination } from '../../helpers/pagination';

async function adminUsersLoader({ request }) {
    try {
        const data = await pagination(request, '/users', 1, 20);

        return data;
    } catch (error) {

    }
}

export { adminUsersLoader };