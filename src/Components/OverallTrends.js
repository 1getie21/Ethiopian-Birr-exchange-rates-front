// src/components/OverallTrends.js

import React from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/charts';

const OverallTrends = ({ trends }) => {
    const config = {
        data: trends,
        xField: 'date',
        yField: 'value',
        seriesField: 'currency',
        lineStyle: { stroke: '#5B8FF9' },
    };

    return (
        <Card title="Overall Trends">
            <Line {...config} />
        </Card>
    );
};

export default OverallTrends;
