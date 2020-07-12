/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useContext, useEffect } from "react";
import { Select, InputNumber } from "antd";
import { GlobalContext } from "../globalContext";
import { getCurrencyRates } from "../http/converter-service";

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
    const [currentRateObj, setCurrentRateObj] = useState<Record<string,string>>({});
    const [currentValue, setCurrentValue] = useState<number>(1);

    const handleSelect = (type: "from" | "to", value: string) => {
        type === "from" ? setCurrentFrom(value) : setCurrentTo(value);
    };

    useEffect(() => {
        getCurrencyRates(currentFrom).then((rateObj) => {
            if (rateObj) {
                setCurrentRateObj(rateObj.rates);
            }
        });
    }, [currentFrom]);

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
                            <Select.Option value={currency.name}>
                                {currency.name}
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
                            <Select.Option value={currency.name}>
                                {currency.name}
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
                    {currentFrom && currentTo && currentValue && (
                        <div>Результат: {currentValue * +currentRateObj[currentTo]}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConverterPage;
