import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CurrencyRates from './CurrencyRates';
import OverallTrends from './OverallTrends';
import OtherCurrencies from './OtherCurrencies';
import BankRates from './BankRates';
import CurrencyList from './CurrencyList';
import BankList from './BankList';
import ExchangeRateList from "./ExchangeRateList";

function Content() {
    return (
        <div
            style={{
                width: '100%',
                marginTop: '10px',
                marginLeft: '10px',
                marginRight: '2px',
                backgroundColor: "rgba(255,255,255,0.62)",
            }}
        >
            <Routes>
                <Route path="/currency-rates" element={<CurrencyRates />} />
                <Route path="/overall-trends" element={<OverallTrends />} />
                <Route path="/other-currencies" element={<OtherCurrencies />} />
                <Route path="/bank-rates" element={<BankRates />} />
                <Route path="/currency-list" element={<CurrencyList />} />
                <Route path="/bank-list" element={<BankList />} />
                <Route path="/Exchange-Rate-List" element={<ExchangeRateList />} />
            </Routes>
        </div>
    );
}

export default Content;
