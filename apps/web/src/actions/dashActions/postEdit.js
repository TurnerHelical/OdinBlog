import { redirect } from 'react-router';
import { api } from '../../helpers/apiHelper';

async function postEdit({ request, params }) {
    const postId = params.postId;
    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    if (data.intent === 'edit') {
        if (data.publish === 'true' || data.unpublish === 'false') {
            const updatedPost = {
                text: data.text,
                title: data.title,
                publish: true,
            }
            await api({ url: `/posts/${postId}`, options: { method: 'PATCH', body: updatedPost } });
            return redirect('/dash');
        }
        if (data.unpublish === 'true' || data.publish === 'false') {
            const updatedPost = {
                text: data.text,
                title: data.title,
                publish: false,
            }
            await api({ url: `/posts/${postId}`, options: { method: 'PATCH', body: updatedPost } });
            return redirect('/dash');
        }
    }
    if (data.intent === 'delete') {
        await api({ url: `/posts/${postId}`, options: { method: 'DELETE' } });
        return redirect('/dash');
    }
}

export { postEdit };