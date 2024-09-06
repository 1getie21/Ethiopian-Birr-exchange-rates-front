import React, { useState, useEffect } from 'react';
import { Card, Select, Spin, Alert } from 'antd';
import { Line } from '@ant-design/charts';
import axios from 'axios';

const { Option } = Select;

const OverallTrends = () => {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBank, setSelectedBank] = useState('CBE'); // Default selection
    const [selectedPeriod, setSelectedPeriod] = useState('This Month'); // Default selection
    const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default selection
    const [filteredTrends, setFilteredTrends] = useState([]);

    // Fetch data from local JSON file
    useEffect(() => {
        axios.get('/db.json') // Adjust path as needed
            .then(response => {
                const data = response.data.overallTrends;
                setTrends(data);
                setFilteredTrends(filterData(data, selectedBank, selectedPeriod, selectedCurrency));
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error); // Log error to console for debugging
                setError('Failed to fetch data');
                setLoading(false);
            });
    }, [selectedBank, selectedPeriod, selectedCurrency]);

    // Filter data based on selections
    const filterData = (data, bank, period, currency) => {
        // Implement filtering logic here
        // For example, you might filter by currency and period
        const filtered = data.filter(d => d.currency === currency); // Filter by currency
        // Further filter by period and bank if needed
        return filtered;
    };

    const handleBankChange = (value) => {
        setSelectedBank(value);
    };

    const handlePeriodChange = (value) => {
        setSelectedPeriod(value);
    };

    const handleCurrencyChange = (value) => {
        setSelectedCurrency(value);
    };

    // Configuration for the Line chart
    const config = {
        data: filteredTrends,
        xField: 'month',
        yField: 'rate',
        lineStyle: { stroke: '#5B8FF9' },
        point: { size: 5, shape: 'circle' },
        xAxis: { title: { text: 'Month' } },
        yAxis: { title: { text: 'Rate' } },
        legend: { position: 'top-right' },
    };

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error} type="error" />;

    return (
        <Card title="Overall Trends">
            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16 }}>
                    <Select defaultValue="CBE" style={{ width: 120, marginRight: 8 }} onChange={handleBankChange}>
                        <Option value="CBE">CBE</Option>
                        <Option value="Awash">Awash</Option>
                        <Option value="Enat">Enat</Option>
                        {/* Add more banks if needed */}
                    </Select>
                    <Select defaultValue="This Month" style={{ width: 150, marginRight: 8 }} onChange={handlePeriodChange}>
                        <Option value="This Month">This Month</Option>
                        <Option value="This Week">This Week</Option>
                        <Option value="This Year">This Year</Option>
                        {/* Add more periods if needed */}
                    </Select>
                    <Select defaultValue="USD" style={{ width: 120 }} onChange={handleCurrencyChange}>
                        <Option value="USD">USD</Option>
                        <Option value="EUR">EUR</Option>
                        <Option value="GBP">GBP</Option>
                        {/* Add more currencies if needed */}
                    </Select>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Overall exchange rate based on time event
                </div>
                <Line {...config} />
            </div>
        </Card>
    );
};

export default OverallTrends;
