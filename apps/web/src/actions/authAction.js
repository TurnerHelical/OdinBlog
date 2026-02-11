import { setAccessToken, getAccessToken } from '../lib/authState.js';
import { api } from '../lib/api.js';
import { redirect } from 'react-router';

export async function authAction({ request }) {
    const fd = await request.formData();

    const email = fd.get('email');
    const password = fd.get('password');
    const intent = fd.get('intent');

    if (intent === 'login') {
        const token = await api('http://localhost:3001/auth/login', {
            method: 'POST',
            body: { email, password },
        },
        );
        setAccessToken(token.accessToken);
        return redirect('/profile')

    }
}