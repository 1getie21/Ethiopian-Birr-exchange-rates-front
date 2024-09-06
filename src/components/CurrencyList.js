// src/components/CurrencyList.js

import React from 'react';
import { Card, List } from 'antd';

const CurrencyList = ({ currencies }) => {
    return (
        <Card title="Currency List">
            <List
                itemLayout="horizontal"
                dataSource={currencies}
                renderItem={(currency) => (
                    <List.Item>
                        <List.Item.Meta
                            title={currency.name}
                            description={`Code: ${currency.code}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default CurrencyList;