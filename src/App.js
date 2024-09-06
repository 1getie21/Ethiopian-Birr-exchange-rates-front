import './App.css';
import CurrencyRates from "./components/CurrencyRates";
import OverallTrends from "./components/OverallTrends";
import OtherCurrencies from "./components/OtherCurrencies";
import BankRates from "./components/BankRates";
import CurrencyList from "./components/CurrencyList";
import BankList from "./components/BankList";

import axios from 'axios';
import {useEffect, useState} from "react";
import React from 'react';
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";
import Content from "./components/Content";
const API_URL = 'http://localhost:8080';

const App = () => {

    return (
        <div>

            <div style={{display: "flex", flexDirection: "row"}}>
                <SideMenu/>
                <Content/>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default App;
