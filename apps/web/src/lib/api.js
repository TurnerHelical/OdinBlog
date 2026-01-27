export async function api(url, { body, headers, ...options } = {}) {
    const res = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw error;
    }

    if (res.status === 204) return null;

    return res.json();
}