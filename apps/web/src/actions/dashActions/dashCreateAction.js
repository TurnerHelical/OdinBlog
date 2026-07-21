import { redirect } from 'react-router';
import { api } from '../../helpers/apiHelper';

async function postCreate({ request }) {
    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    try {
        await api({ url: '/posts', options: { method: 'POST', body: data } });
        return redirect('/dash/drafts');
    } catch (error) {
        const validationErrors = error.data?.errors;

        const message = validationErrors?.length
            ? validationErrors.map((validationError) => validationError.msg).join(' ')
            : error.message;
        return {

            status: error.status ?? 500,
            message,
            values: data,
        }
    }

}

export { postCreate };