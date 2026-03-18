import { redirect } from 'react-router';
import { api } from '../../helpers/apiHelper';

async function settingsAction({ request }) {
    try {
        const fd = await request.formData();
        const data = Object.fromEntries(fd);
        const { user } = await api({ url: '/users/me' });
        if (!user) return redirect('/auth');
        if (data.intent === 'updateProfile') {
            const updatedData = {
                bio: data.bio,
                displayname: data.displayname,
            }

            await api({ url: `/users/${user.id}`, options: { method: 'PATCH', body: updatedData } });
            return redirect('/dash');
        };
        if (data.intent === 'deleteAccount') {
            await api({ url: `/users/${user.id}`, options: { method: 'DELETE' } });
            return redirect('/');
        };
    } catch (error) {

    }
}

export { settingsAction };