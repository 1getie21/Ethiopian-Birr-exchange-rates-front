import React, { useEffect, useState } from 'react';
import { Card, List, Button, Tooltip, Popconfirm, notification, Drawer, Form, Input } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BankList = () => {
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isAddNewMode, setIsAddNewMode] = useState(true);
    const [api, contextHolder] = notification.useNotification();

    const API_URL = "http://localhost:8080/banks"; // Replace with your actual API URL

    const openNotificationWithIcon = (type, messageTitle, description) => {
        api[type]({
            message: messageTitle,
            description: description,
        });
    };

    // Fetch bank data
    const fetchBanks = () => {
        axios.get(API_URL)
            .then(response => {
                setBanks(response.data); // Adjust if response data is nested
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
                openNotificationWithIcon('error', 'Error', error.message);
            });
    };

    useEffect(() => {
        fetchBanks();
    }, []);

    // Handle Add New Bank
    const handleAddBank = (values) => {
        axios.post(API_URL, values)
            .then(() => {
                fetchBanks();
                setDrawerVisible(false);
                openNotificationWithIcon('success', 'Success', 'Bank added successfully.');
            })
            .catch(error => {
                openNotificationWithIcon('error', 'Error', error.message);
            });
    };

    // Handle Update Bank
    const handleUpdateBank = (values) => {
        axios.put(`${API_URL}/${selectedBank.id}`, values)
            .then(() => {
                fetchBanks();
                setDrawerVisible(false);
                openNotificationWithIcon('success', 'Success', 'Bank updated successfully.');
            })
            .catch(error => {
                openNotificationWithIcon('error', 'Error', error.message);
            });
    };

    // Handle Delete Bank
    const handleDeleteBank = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                fetchBanks();
                openNotificationWithIcon('success', 'Success', 'Bank deleted successfully.');
            })
            .catch(error => {
                openNotificationWithIcon('error', 'Error', error.message);
            });
    };

    // Handle form submission
    const handleFormSubmit = (values) => {
        if (isAddNewMode) {
            handleAddBank(values);
        } else {
            handleUpdateBank(values);
        }
    };

    // Show drawer with form for adding or editing
    const showDrawer = (bank = null) => {
        setSelectedBank(bank);
        setIsAddNewMode(!bank); // Add new if no bank is provided
        setDrawerVisible(true);
    };

    // Handle form failure
    const handleFormFail = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <Card title="Bank List">
                <Button type="primary" onClick={() => showDrawer()}>
                    Add New Bank
                </Button>
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={banks}
                    renderItem={bank => (
                        <List.Item
                            actions={[
                                <Tooltip title="Edit">
                                    <a onClick={() => showDrawer(bank)}>
                                        <EditOutlined />
                                    </a>
                                </Tooltip>,
                                <Popconfirm
                                    title="Are you sure to delete this bank?"
                                    onConfirm={() => handleDeleteBank(bank.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Tooltip title="Delete">
                                        <a>
                                            <DeleteOutlined style={{ color: 'red' }} />
                                        </a>
                                    </Tooltip>
                                </Popconfirm>
                            ]}
                        >
                            <List.Item.Meta
                                title={bank.name}
                                description={`Location: ${bank.location}`}
                            />
                        </List.Item>
                    )}
                />
            </Card>

            {/* Add/Edit Bank Drawer */}
            <Drawer
                title={isAddNewMode ? "Add New Bank" : "Edit Bank"}
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                width={400}
            >
                <Form
                    layout="vertical"
                    initialValues={selectedBank}
                    onFinish={handleFormSubmit}
                    onFinishFailed={handleFormFail}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the bank name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Location"
                        name="location"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isAddNewMode ? "Add" : "Update"}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default BankList;
