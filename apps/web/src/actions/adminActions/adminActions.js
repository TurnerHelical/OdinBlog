import { api } from '../../helpers/apiHelper';


async function adminAction({ request }) {
    const fd = await request.formData();
    const data = Object.fromEntries(fd);
    try {
        await api({ url: `/posts/${data.postId}`, options: { method: 'DELETE' } })
    } catch (error) {

    }
}

export { adminAction };