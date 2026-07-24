import { redirect } from 'react-router';
import { api } from '../helpers/apiHelper';
async function blogPageAction({ request }) {

    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    console.log(data);
    await api({ url: `/posts/${data.postId}/comments`, options: { method: 'POST', body: data } })
    return redirect(`/blog/${data.postId}`);

}

export { blogPageAction };