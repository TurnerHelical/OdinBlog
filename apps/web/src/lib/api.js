export async function api(url, options = {}) {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw error;
    }

    return res.json();
}