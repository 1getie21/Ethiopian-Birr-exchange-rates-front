<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import CurrencyRates from './components/CurrencyRates';
import OverallTrends from './components/OverallTrends';
import OtherCurrencies from './components/OtherCurrencies';
import BankRates from './components/BankRates';
import CurrencyList from './components/CurrencyList';
import BankList from './components/BankList';
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

const App = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [overallTrends, setOverallTrends] = useState({});
  const [otherCurrencies, setOtherCurrencies] = useState([]);
  const [bankRates, setBankRates] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [allBanks, setAllBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ratesRes, trendsRes, currenciesRes, banksRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/exchange-rates`),
          axios.get(`${API_BASE_URL}/overall-trends`),
          axios.get(`${API_BASE_URL}/currencies`),
          axios.get(`${API_BASE_URL}/bank-rates`)
        ]);

        setExchangeRates(ratesRes.data);
        setOverallTrends(trendsRes.data);
        setOtherCurrencies(currenciesRes.data);
        setBankRates(banksRes.data);
        setCurrencies(currenciesRes.data); // Adjust according to the API response
        setAllBanks(banksRes.data); // Adjust according to the API response
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
      <div>
        <CurrencyRates rates={exchangeRates} />
        <OverallTrends trends={overallTrends} />
        <OtherCurrencies currencies={otherCurrencies} />
        <BankRates bankRates={bankRates} />
        <CurrencyList currencies={currencies} />
        <BankList banks={allBanks} />
      </div>
  );
>>>>>>> origin/master
};

export default App;
