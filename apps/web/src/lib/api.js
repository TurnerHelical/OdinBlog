import { getAccessToken, setAccessToken, clearAccessToken } from "./authState.js";

const API_BASE = "http://localhost:3001";

async function tryParseJson(res) {
    try {
        return await res.json();
    } catch {
        return null;
    }
}

async function refreshAccessToken() {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        clearAccessToken();
        throw new Error("Refresh failed");
    }

    const data = await res.json();
    setAccessToken(data.accessToken);
    return data.accessToken;
}

export async function api(url, options = {}) {
    const { body, headers = {}, ...fetchOptions } = options;

    const token = getAccessToken();

    const finalHeaders = {
        "Content-Type": "application/json",
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const requestInit = {
        credentials: "include",
        headers: finalHeaders,
        ...fetchOptions,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    };

    let res = await fetch(url, requestInit);


    if (res.status === 401) {
        try {
            const newToken = await refreshAccessToken();

            const retryHeaders = {
                ...finalHeaders,
                Authorization: `Bearer ${newToken}`,
            };

            res = await fetch(url, { ...requestInit, headers: retryHeaders });
        } catch {
        }
    }

    if (!res.ok) {
        const err = (await tryParseJson(res)) ?? { message: "Request failed" };
        throw err;
    }

    if (res.status === 204) return null;
    return res.json();
}