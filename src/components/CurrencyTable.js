import React from 'react';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/reset.css';  // Include Ant Design styles

const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: (text, record) => (
            <Space size="middle">
                <img
                    src={record.flag}
                    alt="flag"
                    style={{ width: '20px', marginRight: '10px' }}
                />
                {text}
            </Space>
        ),
    },
    {
        title: 'Buying',
        dataIndex: 'buying',
        key: 'buying',
        render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
        title: 'Selling',
        dataIndex: 'selling',
        key: 'selling',
        render: (text) => <Tag color="red">{text}</Tag>,
    },
    {
        title: 'Difference',
        dataIndex: 'difference',
        key: 'difference',
    },
];

const data = [
    {
        key: '1',
        code: 'USD ($)',
        flag: 'https://flagcdn.com/w320/us.png',
        buying: '115.10',
        selling: '118.74',
        difference: '± 3.64',
    },
    {
        key: '2',
        code: 'EUR (€)',
        flag: 'https://flagcdn.com/w320/eu.png',
        buying: '124.80',
        selling: '128.75',
        difference: '± 3.94',
    },
    {
        key: '3',
        code: 'GBP (£)',
        flag: 'https://flagcdn.com/w320/gb.png',
        buying: '141.50',
        selling: '145.97',
        difference: '± 4.47',
    },
    {
        key: '4',
        code: 'CHF (CHF)',
        flag: 'https://flagcdn.com/w320/ch.png',
        buying: '125.13',
        selling: '129.09',
        difference: '± 3.96',
    },
    {
        key: '5',
        code: 'SAR (ر.س)',
        flag: 'https://flagcdn.com/w320/sa.png',
        buying: '27.76',
        selling: '28.64',
        difference: '± 0.87',
    },
    {
        key: '6',
        code: 'AED (د.إ)',
        flag: 'https://flagcdn.com/w320/ae.png',
        buying: '28.35',
        selling: '29.25',
        difference: '± 0.89',
    },
    {
        key: '7',
        code: 'CAD ($)',
        flag: 'https://flagcdn.com/w320/ca.png',
        buying: '75.27',
        selling: '77.65',
        difference: '± 2.38',
    },
];

const CurrencyTable = () => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            style={{ width: '100%', marginTop: '20px' }}
        />
    );
};

export default CurrencyTable;
