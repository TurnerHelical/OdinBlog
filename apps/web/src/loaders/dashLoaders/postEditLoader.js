import { api } from '../../helpers/apiHelper';
import { redirect } from 'react-router';

async function editLoader({ params }) {
    try {
        const { postId } = params;
        const user = await api({ url: '/users/me' });
        console.log(user);
        if (!user) return redirect('/dash');
        const data = await api({ url: `/posts/${postId}` });
        console.log(data);
        if (user.user.id != data.userId) return redirect('/dash');
        return data;
    } catch (err) {

    }

}

export { editLoader };