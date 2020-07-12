/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useContext } from "react";
import { Select, InputNumber } from "antd";
import { getConvertedCurrency } from "../http/converter-service";
import { GlobalContext } from "../globalContext";

const pageWrapper = css`
    flex: 1;
`;

const convertForm = css`
    box-shadow: 0px 5px 5px rgba(36, 87, 151, 0.38);
    width: 600px;
    margin: auto;
    margin-top: 30px;
    padding: 30px;
`;

const selectWrapper = css`
    display: flex;
    margin: 12px;
    justify-content: flex-start;
`;

const inputStyle = css`
    width: 200px;
    margin-right: 12px;
`;

const ConverterPage = () => {
    const url = new URL(window.location.href);
    const from = url.searchParams.get("from");

    const globalCtx = useContext(GlobalContext);
    const [currentFrom, setCurrentFrom] = useState<string>(from || "");
    const [currentTo, setCurrentTo] = useState<string>("");
    const [currentRelation, setCurrentRelation] = useState<number>();
    const [currentValue, setCurrentValue] = useState<number>(1);

    const handleSelect = (type: "from" | "to", value: string) => {
        type === "from" ? setCurrentFrom(value) : setCurrentTo(value);
        const firstKey = (type === 'from' ? value : currentFrom);
        const secondKey = (type === 'to' ? value : currentTo);

        if (firstKey && secondKey) {
            getConvertedCurrency(firstKey, secondKey).then((relation) => {
                const relationKey = `${firstKey}_${secondKey}`;
                if (relation) {
                    setCurrentRelation(+relation[relationKey].val || 0);
                }
            });
        }
    };

    return (
        <div css={pageWrapper}>
            <div css={convertForm}>
                <div css={selectWrapper}>
                    <Select
                        defaultValue={currentFrom || undefined}
                        placeholder="Что переводим"
                        onChange={(value) => handleSelect("from", value)}
                        css={inputStyle}
                    >
                        {globalCtx.currencyList.map((currency) => (
                            <Select.Option value={currency.id}>
                                {currency.currencyName}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select
                        onChange={(value) =>
                            handleSelect("to", value as string)
                        }
                        placeholder="Куда переводим"
                        css={inputStyle}
                    >
                        {globalCtx.currencyList.map((currency) => (
                            <Select.Option value={currency.id}>
                                {currency.currencyName}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div css={selectWrapper}>
                    <InputNumber
                        defaultValue={1}
                        onChange={(value) => value && setCurrentValue(+value)}
                        css={inputStyle}
                    />
                    {currentRelation && currentValue && (
                        <div>Результат: {currentValue * currentRelation}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConverterPage;
