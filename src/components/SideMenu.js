import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Tooltip, Menu, Button} from "antd";

import {MenuUnfoldOutlined, MenuFoldOutlined,} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// Initialize list of menu items
const ListOfItems = [
    getItem('Exchange-Rate', 'exchange-rate'),
    getItem('Country-Code', 'country-code'),
    getItem('Banks', 'bank')
];

function SideMenu() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate();

    return (
        <div style={{
            flexDirection: "column",
            boxShadow: "0 5px 8px rgba(0, 0, 0, 0.1)",
            padding: "0 10px",
            marginLeft: -10,
            marginTop: 20,
            display: "flex",
            height: "100vh",
            width:"200px",
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
                    {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                </Button>
            </Tooltip>
            <Menu
                style={{height: '100%'}}
                onClick={({key}) => navigate(key)}
                defaultSelectedKeys={['currency-rates']}
                theme="dark"
                inlineCollapsed={collapsed}
                items={ListOfItems}
            />
        </div>
    );
}

export default SideMenu;
