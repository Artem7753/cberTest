import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route } from "react-router";
import "./App.css";
import "antd/dist/antd.css";
import { GlobalStyle } from "./GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./Components/AppHeader";
import Footer from "./Components/Footer";
import { GlobalContext, Currency } from "./globalContext";
import { getCurrencyList } from "./http/converter-service";

const MainPage = lazy(() => import("./Pages/MainPage"));
const ConverterPage = lazy(() => import("./Pages/ConverterPage"));

const App = () => {
    const [currencyList, setCurrencyList] = useState<Currency[]>([]);
    const [favoriteCurrencyList, setFavoriteCurrencyList] = useState<Currency[]>([]);

    useEffect(() => {
        getCurrencyList().then((currencyListObj) => {
            const currencyList = [];

            for (let key in currencyListObj?.results) {
                currencyList.push(currencyListObj?.results[key] as Currency);
            }

            setCurrencyList(currencyList);
        });
    }, []);

    const globalCtx = {
        currencyList,
        setCurrencyList,
        favoriteCurrencyList,
        setFavoriteCurrencyList,
    };

    return (
        <React.Fragment>
            {GlobalStyle}
            <BrowserRouter>
                <GlobalContext.Provider value={globalCtx}>
                    <AppHeader />
                    <Suspense fallback={<div>...Loading</div>}>
                        <Switch>
                            <Route
                                exact
                                component={ConverterPage}
                                path="/converter"
                            />
                            <Route component={MainPage} path="/" />
                        </Switch>
                    </Suspense>
                    <Footer />
                </GlobalContext.Provider>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
