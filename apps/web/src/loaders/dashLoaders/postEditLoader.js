import { api } from '../../helpers/apiHelper';
import { redirect } from 'react-router';

async function editLoader({ params }) {
    try {
        const { postId } = params;
        const user = await api({ url: '/users/me' });
        if (!user) return redirect('/dash');
        const data = await api({ url: `/posts/${postId}` });
        if (user.user.id != data.userId) return redirect('/dash');
        return data;
    } catch (err) {

    }

}

export { editLoader };