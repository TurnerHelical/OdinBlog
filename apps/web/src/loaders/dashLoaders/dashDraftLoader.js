import { api } from '../../helpers/apiHelper';

async function draftLoader() {
    try {
        const drafts = await api({ url: '/posts/drafts' });
        return drafts
    } catch (err) {

    }
}

export { draftLoader };