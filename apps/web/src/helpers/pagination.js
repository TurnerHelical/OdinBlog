import { api } from '../helpers/apiHelper';

async function pagination(request, apiUrl, defaultPage, defaultLimit) {
    try {

        const url = new URL(request.url);
        let pageNumber = Number(url.searchParams.get('page'));
        let limit = Number(url.searchParams.get('limit'));

        if (!limit) limit = Number(defaultLimit);
        if (!pageNumber) pageNumber = Number(defaultPage);

        const dbData = await api({ url: `${apiUrl}?page=${pageNumber}&limit=${limit}` });

        const totalItems = dbData.totalItems;

        const pages = Math.ceil(totalItems / limit);
        const items = dbData.items
        const data = { pages, pageNumber, items };

        return data;
    } catch (error) {

    }
}



export { pagination };