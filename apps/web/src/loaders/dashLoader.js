import { requireAuth } from "./requireAuth";




export async function dashLoader({ request }) {

    const me = await requireAuth({ request });
    const { user } = me;
    return { user };

}