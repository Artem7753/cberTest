/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState } from "react";
import { Button } from "antd";
import { Currency } from "../globalContext";
import { useHistory } from "react-router-dom";

const currencyWrapperStyle = css`
    box-shadow: 0px 2px 2px rgba(36, 87, 151, 0.18);
    width: 50%;
    max-width: 600px;
    padding: 16px;
    display: flex;
    margin: 30px;
`;

const nameStyle = css`
    margin-right: 12px;
    width: 40%;
`;

const converterButtonStyle = css`
    width: 300px;
    margin-right: 16px;
`;

interface ICurrencyBlockProps extends Currency {
    isFavorite?: boolean;
    toggleCurrencyFavorite: () => void;
}

const CurrencyBlock = ({
    currencyName,
    currencySymbol,
    id,
    isFavorite,
    toggleCurrencyFavorite
}: ICurrencyBlockProps) => {
    const history = useHistory();

    const handleRedirect = () => {
        history.push(`/converter?from=${id}`);
    }

    return (
        <div css={currencyWrapperStyle}>
            <div css={nameStyle}>{currencyName}</div>
            <Button type="primary" css={converterButtonStyle} onClick={handleRedirect}>
                Перейти в конвертер {currencySymbol}
            </Button>
            <Button type={isFavorite ? 'primary' : 'default'} shape="circle" onClick={() => toggleCurrencyFavorite()}>
                ❤
            </Button>
        </div>
    );
};

export default CurrencyBlock;
