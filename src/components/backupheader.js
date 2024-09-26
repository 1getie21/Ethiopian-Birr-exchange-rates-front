import React, { useState } from 'react';
import { AppstoreOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './Header.css'; // Ensure your styles are included
import logo from './../assets/logo.png'; // Adjust the path based on where the image is located

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

    // {
    //     key: 'banks',
    //     label: (<span>Banks In Ethiopia <DownOutlined /></span>),
    //     children: [
    //         {
    //             label: 'All Banks In Ethiopia',
    //             key: 'all_banks',
    //         },
    //         {
    //             label: 'New Banks In Ethiopia',
    //             key: 'new_banks',
    //         },
    //         {
    //             label: 'Interest Free Banking',
    //             key: 'interest_free',
    //         },
    //         {
    //             label: 'Best Commercial Banks In Ethiopia 2024',
    //             key: 'best_commercial',
    //         },
    //     ],
    // },
    // {
    //     key: 'alipay',
    //     label: (<span>Diaspora Banking<DownOutlined /></span>),
    //     children: [
    //         {
    //             label: 'Diaspora Account In Ethiopia',
    //             key: 'diaspora_account',
    //         },
    //         {
    //             label: 'Diaspora Mortgage Loan In Ethiopia',
    //             key: 'diaspora_mortgage',
    //         },
    //         {
    //             label: 'Diaspora Car Loan In Ethiopia',
    //             key: 'diaspora_car_loan',
    //         },
    //         {
    //             label: 'Best Banks For Diaspora Loan In Ethiopia',
    //             key: 'best_diaspora_loan',
    //         },
    //     ],
    // },

    // {
    //     key: 'loan',
    //     label: (<span>Loan<DownOutlined /></span>),
    //     children: [
    //         {
    //             label: 'Car Loan In Ethiopia',
    //             key: 'car_loan',
    //         },
    //         {
    //             label: 'House Loan In Ethiopia',
    //             key: 'house_loan',
    //         },
    //         {
    //             label: 'Personal Loan In Ethiopia',
    //             key: 'personal_loan',
    //         },
    //         {
    //             label: 'Best Banks Loan Interest Rate In Ethiopia',
    //             key: 'best_loan_rate',
    //         },
    //     ],
    // },
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
                <img style={{width:'110px'}} src={logo} alt="Logo" />
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
