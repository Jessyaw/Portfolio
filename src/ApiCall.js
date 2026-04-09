export const ApiCall = async (url, method, data) => {
    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const json = await res.json();
        return json;

    } catch (e) {
        return { status: 'F', message: e.message };
    }
};