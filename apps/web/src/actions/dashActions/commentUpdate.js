import { redirect } from 'react-router';
import { api } from '../../helpers/apiHelper';

async function commentUpdate({ request, params }) {
    const commentId = params.commentId
    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    try {
        if (data.intent === 'edit') {
            const newText = {
                updatedText: data.commentText,
            }
            await api({ url: `/comments/${commentId}`, options: { method: 'PATCH', body: newText } });
            return redirect('/dash/comments');
        }

        if (data.intent === 'delete') {
            await api({ url: `/comments/${commentId}`, options: { method: 'DELETE' } });
            return redirect('/dash');
        }
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

export { commentUpdate };