import React from 'react';

export type Currency = {
    name: string;
    rate: string;
};

export type GlobalContextType = {
    currencyList: Currency[];
    setCurrencyList: (currencies: Currency[] ) => void;
    favoriteCurrencyList: Currency[];
    setFavoriteCurrencyList: (currencies: Currency[]) => void;
    baseCurrency: string;
    setBaseCurrency: (currency: string) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({
    currencyList: [],
    setCurrencyList: () => {},
    favoriteCurrencyList: [],
    setFavoriteCurrencyList: () => {},
    baseCurrency: '',
    setBaseCurrency: () => {},
});