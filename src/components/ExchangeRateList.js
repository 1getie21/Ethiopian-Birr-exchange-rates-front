import React, { useState, useEffect } from 'react';
import { List, Card, Spin, Alert } from 'antd';

const ExchangeRateList = () => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/exchangeRateList') // Adjust the URL as needed
            .then(response => response.json())
            .then(data => {
                // If the data is an object with a specific key
                if (Array.isArray(data)) {
                    setRates(data); // Directly set if it's an array
                } else {
                    // If it's an object with an array
                    setRates(data.exchangeRateList || []); // Adjust key if needed
                }
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch data');
                setLoading(false);
            });
    }, []);

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error} type="error" />;

    return (
        <Card title="Exchange Rates">
            <List
                itemLayout="horizontal"
                dataSource={rates}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.currency}
                            description={`Rate: ${item.rate} as of ${item.date}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default ExchangeRateList;
