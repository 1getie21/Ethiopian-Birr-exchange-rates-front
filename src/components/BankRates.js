// src/components/BankRates.js

import React from 'react';
import { Card, Table } from 'antd';

const BankRates = ({ bankRates }) => {
    const columns = [
        { title: 'Bank', dataIndex: 'bank', key: 'bank' },
        { title: 'Buying Rate', dataIndex: 'buyingRate', key: 'buyingRate' },
        { title: 'Selling Rate', dataIndex: 'sellingRate', key: 'sellingRate' },
    ];

    return (
        <Card title="Bank Rates">
            <Table dataSource={bankRates} columns={columns} rowKey="bank" />
        </Card>
    );
};

export default BankRates;