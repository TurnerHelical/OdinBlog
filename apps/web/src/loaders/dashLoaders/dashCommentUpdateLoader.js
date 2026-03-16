import { api } from '../../helpers/apiHelper';
import { redirect } from 'react-router';

async function commentUpdateLoader({ params }) {
    try {
        const { commentId } = params;
        const user = await api({ url: '/users/me' });
        if (!user) return redirect('/');
        const data = await api({ url: `/comments/${commentId}` });
        return data;
    } catch (error) {

    }
}

export { commentUpdateLoader };