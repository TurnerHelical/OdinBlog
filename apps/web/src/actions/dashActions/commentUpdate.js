import { redirect } from 'react-router';
import { api } from '../../helpers/apiHelper';

async function commentUpdate({ request, params }) {
    const commentId = params.commentId
    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    const newText = {
        updatedText: data.commentText,
    }
    await api({ url: `/comments/${commentId}`, options: { method: 'PATCH', body: newText } });
    return redirect('/dash/comments');
}

export { commentUpdate };