import { redirect } from 'react-router';
import { api } from '../../helpers/apiHelper';

async function postEdit({ request }) {
    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    if (data.publish === 'true') {
        const updatedPost = {
            text: data.text,
            title: data.title,
            publish: true,
        }
        await api({ url: `/posts/${data.postId}`, options: { method: 'PATCH', body: updatedPost } });
        return redirect('/dash');
    }
    const updatedPost = {
        text: data.text,
        title: data.title,
        publish: false,
    }
    await api({ url: `/posts/${data.postId}`, options: { method: 'PATCH', body: updatedPost } });
    return redirect('/dash');
}

export { postEdit };