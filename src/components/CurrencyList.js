import React, { useState, useEffect } from 'react';
import { Button, Drawer, Form, Input, Row, Col, Spin, Alert, Table, notification } from 'antd';
import axios from 'axios';

const CurrencyList = () => {
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [form] = Form.useForm();
    const [addNewMode, setAddNewMode] = useState(false);
    const [currencyToEdit, setCurrencyToEdit] = useState(null);
    const [api, contextHolder] = notification.useNotification();

    const API_URL = '/db.json'; // Adjust path as needed

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                if (response.data.currencyList) {
                    setCurrencies(response.data.currencyList);
                } else {
                    throw new Error('Invalid data format');
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError(`Failed to fetch currency data: ${error.message}`);
                console.error('Fetch error:', error); // Log error details
            });
    }, []);

    const openNotificationWithIcon = (type, messageTitle, description) => {
        api[type]({
            message: messageTitle,
            description: description,
        });
    };

    const handleDrawerClose = () => {
        setDrawerVisible(false);
        setCurrencyToEdit(null);
        form.resetFields();
    };

    const handleAddNewClick = () => {
        setAddNewMode(true);
        setDrawerVisible(true);
    };

    const handleEditClick = (currency) => {
        setCurrencyToEdit(currency);
        form.setFieldsValue(currency);
        setAddNewMode(false);
        setDrawerVisible(true);
    };

    const handleFormSubmit = (values) => {
        if (addNewMode) {
            // Handle adding new currency
            openNotificationWithIcon('success', 'Success', 'New currency added successfully.');
        } else {
            // Handle updating existing currency
            openNotificationWithIcon('success', 'Success', 'Currency updated successfully.');
        }
        handleDrawerClose();
        // Refetch data or update state as needed
    };

    const columns = [
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Code',
            dataIndex: 'currency',
            key: 'code',
            render: text => `Code: ${text}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => handleEditClick(record)}>Edit</Button>
            ),
        },
    ];

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error} type="error" />;

    return (
        <>
            {contextHolder}
            <Row justify="end" style={{ marginBottom: 16 }}>
                <Col>
                    <Button type="primary" onClick={handleAddNewClick}>Add New Currency</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={currencies}
                        rowKey="currency"
                    />
                </Col>
            </Row>
            <Drawer
                title={addNewMode ? "Add New Currency" : "Edit Currency"}
                placement="right"
                onClose={handleDrawerClose}
                visible={drawerVisible}
                width={400}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                >
                    <Form.Item
                        label="Currency"
                        name="currency"
                        rules={[{ required: true, message: 'Please input the currency!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {addNewMode ? "Add Currency" : "Update Currency"}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default CurrencyList;
