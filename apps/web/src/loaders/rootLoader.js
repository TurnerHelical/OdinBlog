import { refreshAccessToken } from '../lib/authApi.js';

export async function rootLoader() {
    try {
        await refreshAccessToken();
    } catch {

    }

    return null
};