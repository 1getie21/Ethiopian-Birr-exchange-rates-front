import './App.css';
import React from 'react';
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import ExchangeRateList from "./components/ExchangeRateList";

const App = () => {
    return (
        <div className="app-container">
            <Header/>
            <ExchangeRateList/>
            <Footer/>
        </div>
    );
};
export default App;
