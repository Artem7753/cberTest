/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useContext, useEffect } from "react";
import { GlobalContext, Currency } from "../globalContext";
import CurrencyBlock from "../Components/CurrencyBlock";
import { Select } from "antd";

const pageWrapper = css`
    flex: 1;
    position: relative;
`;

const baseCurrencySelectStyle = css`
    position: absolute;
    top: 30px;
    right: 30px;
    width: 100px;
`;

const MainPage = () => {
    const globalCtx = useContext(GlobalContext);
    const [unFavoriteCurrency, setUnfavoriteCurrency] = useState<Currency[]>(
        globalCtx.currencyList
    );

    useEffect(() => {
        const filteredUnfavorite = globalCtx.currencyList.filter(currency => globalCtx.favoriteCurrencyList.findIndex((favorite) => currency.name === favorite.name) < 0)
        setUnfavoriteCurrency(filteredUnfavorite);
    }, [globalCtx.currencyList, globalCtx.baseCurrency]);

    const toggleCurrencyFavorite = (currentCurrency: Currency) => {
        let newFavoriteList: Currency[] = [];
        if (globalCtx.favoriteCurrencyList.findIndex((currency) => currency.name === currentCurrency.name) > -1) {
            newFavoriteList = globalCtx.favoriteCurrencyList.filter((currency) => currency.name !== currentCurrency.name);
        } else {
            newFavoriteList = globalCtx.favoriteCurrencyList.concat(currentCurrency);
        }

        globalCtx.setFavoriteCurrencyList(newFavoriteList);

        const newUnFavoriteList = globalCtx.currencyList.filter(
            (currency) =>
                newFavoriteList.findIndex(
                    (favorite) => favorite.name === currency.name
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
            <Select
                defaultValue={globalCtx.baseCurrency}
                onChange={(value) => globalCtx.setBaseCurrency(value)}
                css={baseCurrencySelectStyle}
            >
                {globalCtx.currencyList.map((currency) => (
                    <Select.Option value={currency.name}>
                        {currency.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default MainPage;
