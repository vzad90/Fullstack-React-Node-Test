export async function fetchDataFromServer<T>(
    url: string,
    options: RequestInit = {},
): Promise<T> {
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API error: ${response.status} ${errorBody}`);
    }

    return response.json();
}
