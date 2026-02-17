import { setAccessToken, getAccessToken } from '../lib/authState.js';
import { api } from '../lib/api.js';
import { redirect } from 'react-router';


export async function authAction({ request }) {
    const fd = await request.formData();

    const email = fd.get('email');
    const password = fd.get('password');
    const intent = fd.get('intent');

    if (!intent === 'register') {
        const token = await api('http://localhost:3001/auth/login', {
            method: 'POST',
            body: { email, password },
        },
        );
        setAccessToken(token.accessToken);
        return redirect(`/dashboard`);

    };
    const confirmPassword = fd.get('confirmPassword');
    const displayname = fd.get('displayname');

    const newUser = await api('http://localhost:3001/auth/register', {
        method: 'POST',
        body: { email, password, confirmPassword, displayname },
    },
    );
    setAccessToken(newUser.accessToken);
    return redirect('/dashboard');
}