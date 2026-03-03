import { setAccessToken, api } from '../helpers/apiHelper';
import { redirect } from 'react-router';

export async function authAction({ request }) {
    const fd = await request.formData();
    const data = Object.fromEntries(fd);

    const { intent, ...fields } = data;

    if (intent === 'login') {

        const data = await api({ url: '/auth/login', options: { method: 'POST', body: fields } })
        const token = data.accessToken;
        setAccessToken(token);
        return redirect('/');
    };

    const apiData = await api({ url: '/auth/register', options: { method: 'POST', body: fields } });
    const token = apiData.accessToken;
    setAccessToken(token);
    return redirect('/');
}