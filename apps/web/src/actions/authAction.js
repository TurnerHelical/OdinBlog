import { setAccessToken, getAccessToken } from '../lib/authState.js';
import { api } from '../lib/api.js';
import { redirect } from 'react-router';
import { jwtDecode } from 'jwt-decode';

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
        const decodeToken = jwtDecode(token.accessToken);
        const userId = decodeToken.sub;
        return redirect(`/dashboard`);

    }
}