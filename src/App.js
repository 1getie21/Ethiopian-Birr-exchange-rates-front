import './App.css';   
import React from 'react';
import CurrencyTable from "./components/CurrencyTable";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";

const App = () => {

    return (
        <div>
            {/*<CurrencyTable/>*/}
            <Header/>
            <div style={{display: "flex", flexDirection: "row"}}>
                <SideMenu/>
                <Content/>
            </div>
            <Footer/>
        </div>

    );
};

export default App;
