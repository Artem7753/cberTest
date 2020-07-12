/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useContext, useEffect } from "react";
import { GlobalContext, Currency } from "../globalContext";
import { getCurrencyList } from "../http/converter-service";
import CurrencyBlock from "../Components/CurrencyBlock";

const pageWrapper = css`
    flex: 1;
`;

const MainPage = () => {
    const globalCtx = useContext(GlobalContext);
    const [unFavoriteCurrency, setUnfavoriteCurrency] = useState<Currency[]>(globalCtx.currencyList);

    useEffect(() => {
        setUnfavoriteCurrency(globalCtx.currencyList);
    }, [globalCtx.currencyList]);

    const toggleCurrencyFavorite = (currentCurrency: Currency) => {
        let newFavoriteList: Currency[] = [];
        if (globalCtx.favoriteCurrencyList.findIndex((currency) => currency.id === currentCurrency.id) > -1) {
            newFavoriteList = globalCtx.favoriteCurrencyList.filter((currency) => currency.id !== currentCurrency.id);
        } else {
            newFavoriteList = globalCtx.favoriteCurrencyList.concat(
                currentCurrency
            );
        }

        globalCtx.setFavoriteCurrencyList(newFavoriteList);

        const newUnFavoriteList = globalCtx.currencyList.filter(
            (currency) =>
                newFavoriteList.findIndex(
                    (favorite) => favorite.id === currency.id
                ) < 0
        );
        setUnfavoriteCurrency(newUnFavoriteList);
    };

    return (
        <div css={pageWrapper}>
            {globalCtx.favoriteCurrencyList.map((currency) => (
                <CurrencyBlock
                    {...currency}
                    toggleCurrencyFavorite={() =>
                        toggleCurrencyFavorite(currency)
                    }
                    isFavorite
                />
            ))}
            {unFavoriteCurrency.map((currency) => (
                <CurrencyBlock
                    toggleCurrencyFavorite={() =>
                        toggleCurrencyFavorite(currency)
                    }
                    {...currency}
                />
            ))}
        </div>
    );
};

export default MainPage;
