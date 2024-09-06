import React from 'react';
import { Card, List } from 'antd';

const CurrencyRates = ({ rates = {} }) => {
    if (!rates || typeof rates !== 'object') {
        return <Card title="Currency Rates">No data available</Card>;
    }

    return (
        <Card title="Currency Rates">
            <List
                itemLayout="horizontal"
                dataSource={Object.entries(rates)}
                renderItem={([currency, rate]) => (
                    <List.Item>
                        <List.Item.Meta
                            title={currency}
                            description={`Rate: ${rate}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default CurrencyRates;

