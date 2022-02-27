export const makeRequest = async <T>(url: string, method: 'GET' = 'GET') => {
    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data: T = await res.json();

    return data;
};
