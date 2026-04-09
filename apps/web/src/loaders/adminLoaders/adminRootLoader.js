import { api } from '../../helpers/apiHelper';
import { redirect } from 'react-router';

async function adminLoader() {
    try {
        const user = await api({ url: '/users/me' });
        if (!user) return redirect('/auth');
        if (user.isAdmin == false) return redirect('/dash');
        return user;
    } catch (error) {

    }
}

export { adminLoader };