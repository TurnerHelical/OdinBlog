import { api, initAuth } from '../helpers/apiHelper';

async function root() {
    try {
        const token = await initAuth();

        if (!token) return { user: null };

        const user = await api('/users/me', {
            method: 'GET',
        });

        if (!user) return { user: null };

        return { user };

    } catch (error) {

        if (error.status === 401) return { user: null };

        throw error;
    }

}
export { root };