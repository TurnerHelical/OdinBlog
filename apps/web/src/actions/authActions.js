import { setAccessToken, api } from '../helpers/apiHelper';
import { redirect } from 'react-router';

export async function authAction({ request }) {

    const fd = await request.formData();
    const data = Object.fromEntries(fd);

    const { intent, ...fields } = data;
    try {
        if (intent === 'login') {

            const data = await api({ url: '/auth/login', options: { method: 'POST', body: fields } })
            const token = data.accessToken;
            setAccessToken(token);
            return redirect('/');
        } else if (intent === 'register') {

            const apiData = await api({ url: '/auth/register', options: { method: 'POST', body: fields } });
            const token = apiData.accessToken;
            setAccessToken(token);
            return redirect('/');
        }
        await api({ url: '/auth/logout', options: { method: 'POST' } });
        setAccessToken(null)
        return redirect('/auth');
    } catch (error) {

        return {
            ok: false,
            intent,
            status: error.status,
            message: error.message || 'Request failed',
            field: error.data?.field ?? null,
        };
    }

}