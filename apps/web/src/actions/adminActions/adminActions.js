import { api } from '../../helpers/apiHelper';


async function adminAction({ request }) {
    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    try {
        if (data.intent === 'deletePost') {
            await api({ url: `/posts/${data.postId}`, options: { method: 'DELETE' } });
        }

        if (data.intent === 'deleteUser') {
            await api({ url: `/users/${data.userId}`, options: { method: 'DELETE' } });
        }
    } catch (error) {

    }
}

export { adminAction };