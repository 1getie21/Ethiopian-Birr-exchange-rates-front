import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Banks from './Banks';
import CountryCode from './CountryCode';
import ExchangeRateList from './ExchangeRateList';

function Content() {
    return (
        <div
            style={{
                width: '100%',
                marginTop: '100px',
                marginLeft: '10px',
                marginRight: '2px',
                backgroundColor: "rgba(255,255,255,0.62)",
            }}
        >
            <Routes>
                <Route path="/exchange-rate" element={<ExchangeRateList />} />
                <Route path="/country-code" element={<CountryCode />} />
                <Route path="/bank" element={<Banks />} />
            </Routes>
        </div>
    );
}

export default Content;

