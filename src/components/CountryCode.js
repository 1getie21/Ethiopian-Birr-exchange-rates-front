import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button, Col, Drawer, Form, Input, notification, Row, Table, Space
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const axiosInstance = axios.create(); 

const CountryCode = () => {

    const [data, setData] = useState([]);
    const [dataById, setDataById] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [addNewMode, setAddNewMode] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const API_URL = "http://localhost:8080";
    const [form] = Form.useForm();

    // Function to fetch banks list from the server
    const fetchBanks = () => {
        axiosInstance.get(`${API_URL}/banks`)
            .then(response => {
                setData(response?.data?.content || []);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                openNotificationWithIcon('error', 'Error', error?.message);
            });
    };

    // Function to fetch bank details by ID
    const getDataById = (id) => {
        axiosInstance.get(`${API_URL}/banks/${id}`)
            .then(response => {
                setDataById(response.data);
                form.setFieldsValue(response.data);
            })
            .catch(error => {
                openNotificationWithIcon('error', 'Error', error?.message);
            });
    };

    // Notification function
    const openNotificationWithIcon = (type, messageTitle, description) => {
        api[type]({
            message: messageTitle,
            description: description,
        });
    };

    // Handle deleting a bank
    const confirmDelete = (id) => {
        axiosInstance.delete(`${API_URL}/banks/${id}`)
            .then(() => {
                openNotificationWithIcon('success', 'Success', 'Bank deleted successfully.');
                fetchBanks();
            })
            .catch(error => {
                openNotificationWithIcon('error', 'Error', error?.message);
            });
    };

    // Open the drawer form for adding/updating a bank
    const showDrawer = (id) => {
        setOpen(true);
        form.resetFields();
        if (id === undefined) {
            setAddNewMode(true);
        } else {
            getDataById(id);
            setAddNewMode(false);
        }
    };

    // Submit form to add or update bank
    const handleSubmit = (values) => {
        if (addNewMode) {
            axiosInstance.post(`${API_URL}/banks`, values)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Bank added successfully.');
                    fetchBanks();
                    setOpen(false);
                })
                .catch(error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
        } else {
            axiosInstance.put(`${API_URL}/banks/${dataById.id}`, values)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Bank updated successfully.');
                    fetchBanks();
                    setOpen(false);
                })
                .catch(error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
        }
    };

    // Fetch banks data on mount
    useEffect(() => {
        fetchBanks();
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Bank',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => showDrawer(record.id)} icon={<EditOutlined />} />
                    <Button onClick={() => confirmDelete(record.id)} icon={<DeleteOutlined />} danger />
                </Space>
            ),
        },
    ];

    return (
        <>
            {contextHolder}

            {/* Main layout with space between table and buttons */}
            <Row gutter={[16, 16]} justify="center">
                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h2>Banks</h2>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer()}>Add New Bank</Button>
                </Col>

                <Col span={24}>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                </Col>
            </Row>

            {/* Drawer for adding/updating banks */}
            <Drawer
                title={addNewMode ? "Add New Bank" : "Update Bank"}
                width={360}
                placement="right"
                onClose={() => setOpen(false)}
                open={open}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}>
                    <Form.Item
                        label="Bank Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter bank name!' }]}>
                        <Input placeholder="Enter bank name" />
                    </Form.Item>

                    {/* Additional Form Items can be added here if needed */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {addNewMode ? "Add Bank" : "Update Bank"}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default CountryCode;
