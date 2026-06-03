import { redirect } from 'react-router';
import { api } from '../../helpers/apiHelper';

async function postCreate({ request }) {
    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    try {
        await api({ url: '/posts', options: { method: 'POST', body: data } });
        return redirect('/dash/drafts');
    } catch (error) {
        return {
            ok: false,
            status: error.status,
            message: error.message || 'Request failed',
            values: data,
        }
    }

}

export { postCreate };