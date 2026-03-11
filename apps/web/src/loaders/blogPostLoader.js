import { api } from '../helpers/apiHelper';

async function blogPostLoader({ params }) {
    try {
        const { postId } = params
        const post = await api({ url: `/posts/${postId}` })
        return post;
    } catch (error) {

    }
}

export { blogPostLoader };