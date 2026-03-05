let accessToken = null;
let refreshInFlight = null;

const API_BASE = 'http://localhost:3001';

function setAccessToken(token) {
    accessToken = typeof token === 'string' && token.length ? token : null;
};

function getAccessToken() {
    return accessToken;
}

async function refreshAccessToken() {
    if (refreshInFlight) return refreshInFlight;

    refreshInFlight = (async () => {
        try {
            const res = await fetch(`${API_BASE}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });



            if (!res.ok) {
                setAccessToken(null);
                return null;
            }
            const data = await res.json();
            const newToken = data.accessToken;

            setAccessToken(newToken);

            return newToken ?? null;
        } catch {
            setAccessToken(null);
            return null;
        } finally {
            refreshInFlight = null;
        };
    })();

    return refreshInFlight;
};

async function initAuth() {
    return refreshAccessToken();
}

async function api({ url, options = {} }) {
    const {
        method = 'GET',
        headers = {},
        body,
        _retried = false,
    } = options;

    const finalHeaders = {
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    };

    const requestInit = {
        method,
        headers: finalHeaders,
        credentials: 'include',
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    };

    let res = await fetch(url.startsWith('http') ? url : `${API_BASE}${url}`, requestInit);

    if (res.status === 401 && !_retried) {
        const newToken = await refreshAccessToken();

        if (newToken) {
            return api(url, { ...options, _retried: true });
        }

        const err = new Error('Not authenticated');
        err.status = 401;
        throw err;
    }

    if (!res.ok) {
        let errorPayload = null;
        try {
            errorPayload = await res.json();
        } catch {
            errorPayload = { message: await res.text().catch(() => 'Request failed') };
        }

        const err = new Error(errorPayload?.message || 'Request failed');
        err.status = res.status;
        err.data = errorPayload;
        throw err;
    }

    if (res.status === 204) return null;

    return res.json();
}


export { setAccessToken, getAccessToken, initAuth, api };
