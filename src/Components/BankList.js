// src/components/BankList.js

import React from 'react';
import { Card, List } from 'antd';

const BankList = ({ banks }) => {
    return (
        <Card title="Bank List">
            <List
                itemLayout="horizontal"
                dataSource={banks}
                renderItem={(bank) => (
                    <List.Item>
                        <List.Item.Meta
                            title={bank.name}
                            description={`Location: ${bank.location}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default BankList;