import React from 'react';

export type Currency = {
    currencyName: string,
    currencySymbol: string,
    id: string
};

export type GlobalContextType = {
    currencyList: Currency[];
    setCurrencyList: (currencies: Currency[] ) => void;
    favoriteCurrencyList: Currency[];
    setFavoriteCurrencyList: (currencies: Currency[]) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({
    currencyList: [],
    setCurrencyList: () => {},
    favoriteCurrencyList: [],
    setFavoriteCurrencyList: () => {},
});