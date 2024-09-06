import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, Menu, Button } from "antd";
import {
    DollarCircleOutlined, GlobalOutlined, BankOutlined, UnorderedListOutlined,
    MenuUnfoldOutlined, MenuFoldOutlined, ArrowUpOutlined, ApartmentOutlined, MoneyCollectOutlined,
} from "@ant-design/icons";
import ExchangeRateList from "./ExchangeRateList";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,ExchangeRateList
    };
}

const ListOfItems = [
    getItem('Currency Rates', 'currency-rates', <DollarCircleOutlined />),
    getItem('Overall Trends', 'overall-trends', <ArrowUpOutlined />),
    getItem('Other Currencies', 'other-currencies', <GlobalOutlined />),
    getItem('Bank Rates', 'bank-rates', <BankOutlined />),
    getItem('Currency List', 'currency-list', <UnorderedListOutlined />),
    getItem('Bank List', 'bank-list', <ApartmentOutlined  />),
    getItem('Exchange Rate List', 'Exchange-Rate-List', <MoneyCollectOutlined  />)
];

function SideMenu() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed(!collapsed);
    const navigate = useNavigate();

    return (
        <div style={{
            flexDirection: "column",
            boxShadow: "0 5px 8px rgba(0, 0, 0, 0.1)",
            padding: "0 10px",
            marginLeft: -10,
            display: "flex",
            height: "100vh",
            fontFamily: 'Roboto, sans-serif',
            overflowY: 'auto',
        }}>
            <Tooltip title="Collapse/Expand">
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        borderRadius: 0,
                        marginBottom: 10,
                    }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </Tooltip>
            <Menu
                style={{ height: '100%' }}
                onClick={({ key }) => navigate(`/${key}`)}
                defaultSelectedKeys={['currency-rates']}
                theme="dark"
                inlineCollapsed={collapsed}
                items={ListOfItems}
            />
        </div>
    );
}

export default SideMenu;
