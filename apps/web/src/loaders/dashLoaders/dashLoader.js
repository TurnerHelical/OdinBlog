import { api } from '../../helpers/apiHelper';
import { redirect } from 'react-router';

async function dashLoader({ request }) {
    try {
        const testurl = new URL(request.url);
        console.log(testurl);
        const data = await api({ url: '/users/me' });
        if (!data) return redirect('/auth');
        const user = data.user;

        return user;
    } catch (error) {
        if (error.status === 401) {
            return redirect('/auth');
        }
    }
}

export { dashLoader };