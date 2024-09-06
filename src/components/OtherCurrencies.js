// src/components/OtherCurrencies.js

import React from 'react';
import { Card, List } from 'antd';

const OtherCurrencies = ({ currencies }) => {
    return (
        <Card title="Other Currencies">
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

export default OtherCurrencies;
