import React, { useState } from 'react';
import { AppstoreOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './Header.css'; // Ensure your styles are included
import logo from './../assets/log.png'; // Adjust the path based on where the image is located

const items = [
    {
        key: 'ex_rate',
        label: 'Exchange Rate',
    },

    {
        label: 'News',
        key: 'mail',
    },
    {
        label: 'About',
        key: 'about',
    },
];


const Header = () => {
    const [current, setCurrent] = useState('mail');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img style={{width:'40px'}} src={logo} alt="Logo" />
            </div>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items.map(item => ({
                    ...item,
                    icon: item.icon || null,
                    children: item.children ? item.children.map(child => ({
                        ...child,
                        key: child.key,
                    })) : null,
                }))}
                className="header-menu"
            />
        </header>
    );
};

export default Header;
