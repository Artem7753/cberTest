import { Currency } from "../globalContext";

type HttpMethod = 'POST' | 'GET';

export type CurrencyListResponse = {
    results: Record<string,Currency>;
};

export type ConvertedValue = {
    val: string;
}

const API_URL = 'https://free.currconv.com/api/v7';
const API_KEY = 'b85a2edba0816148eed8';

export async function httpRequest<T>(url: string, method: HttpMethod, body?: T) {
    let res: Response | null = null;
    try {
        res = await fetch((url), {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body && JSON.stringify(body),
        });
    } catch (error) {
        console.warn('error: ', error);
    }

    return res;
};

export async function getCurrencyList() {
    const res = await httpRequest(`${API_URL}/currencies?apiKey=${API_KEY}`, 'GET');

    if (res?.status !== 200) {
        console.log('Something went wrong', res);
        return undefined;
    }

    return (res.json() as Promise<CurrencyListResponse>);
}

export async function getConvertedCurrency(from: string, to: string) {
    const convertID = `${from}_${to}`.toLocaleUpperCase();
    const res = await httpRequest(`${API_URL}/convert?apiKey=${API_KEY}&q=${convertID}&compact=y`, 'GET');

    if (res?.status !== 200) {
        console.log('Something went wrong', res);
        return undefined;
    }

    return (res.json() as Promise<Record<string,ConvertedValue>>);
}

