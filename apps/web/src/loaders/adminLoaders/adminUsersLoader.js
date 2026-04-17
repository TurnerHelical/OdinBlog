import { pagination } from '../../helpers/pagination';

async function adminUsersLoader({ request }) {
    try {
        const users = await pagination(request, '/users', 1, 20);
        return users;
    } catch (error) {

    }
}

export { adminUsersLoader };