import { api } from '../lib/api.js';
import { redirect } from 'react-router';

export async function authAction({ request }) {
    const formData = await request.formData();
    const intent = formData.get('intent');

    if (intent === 'login') {
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            await api('http://localhost:3001/auth/login', {
                method: 'POST',
                body: { email, password },
            });
            return redirect('/profile');
        } catch (err) {
            return { error: err?.message || 'Login failed ' };
        };
    } else if (intent === 'register') {
        const email = formData.get('email');
        const password = formData.get('password');
        const confirm = formData.get('confirmPassword');
        const displayName = formData.get('displayname');

        try {
            await api('http://localhost:3001/auth/register');
            return redirect('/profile')
        } catch (err) {
            return { error: err?.message || 'Unable to register' };
        }
    };

}