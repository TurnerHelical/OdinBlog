import { api } from '../lib/api.js';
import { redirect } from 'react-router';

export async function createDraft({ request }) {
    const fd = await request.formData();
    const title = fd.get('title');
    const text = fd.get('blogText');

    try {
        await api('http://localhost:3001/posts', {
            method: 'POST',
            body: { title, text },
        });
        return redirect('/dashboard/drafts');
    } catch (err) {
        return redirect('/dashboard/create-draft')
    };
}