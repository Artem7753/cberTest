type HttpMethod = "POST" | "GET";

export type CurrencyListResponse = {
    rates: Record<string, string>;
};

export type ConvertedValue = {
    val: string;
};

const API_URL = "https://api.exchangeratesapi.io/latest";

export async function httpRequest<T>(
    url: string,
    method: HttpMethod,
) {
    let res: Response | null = null;
    try {
        res = await fetch(url, {
            method,
        });
    } catch (error) {
        console.warn("error: ", error);
    }

    return res;
}

export async function getCurrencyRates(base: string) {
    const res = await httpRequest(`${API_URL}?base=${base}`, "GET");

    if (res?.status !== 200) {
        console.log("Something went wrong", res);
        return undefined;
    }

    return res.json() as Promise<CurrencyListResponse>;
}
