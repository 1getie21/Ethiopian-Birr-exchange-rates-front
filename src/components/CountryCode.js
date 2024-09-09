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

    // Function to fetch countr code list from the server
    const fetchCountryCode = () => {
        axiosInstance.get(`${API_URL}/country`)
            .then(response => {
                setData(response?.data?.content || []);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                openNotificationWithIcon('error', 'Error', error?.message);
            });
    };

    // Function to fetch countr code details by ID
    const getDataById = (id) => {
        axiosInstance.get(`${API_URL}/country/${id}`)
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

    // Handle deleting a countr code
    const confirmDelete = (id) => {
        axiosInstance.delete(`${API_URL}/country/${id}`)
            .then(() => {
                openNotificationWithIcon('success', 'Success', 'Country deleted successfully.');
                fetchCountryCode();
            })
            .catch(error => {
                openNotificationWithIcon('error', 'Error', error?.message);
            });
    };

    // Open the drawer form for adding/updating a countr code
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

    // Submit form to add or update countr code
    const handleSubmit = (values) => {
        if (addNewMode) {
            axiosInstance.post(`${API_URL}/country`, values)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Country added successfully.');
                    fetchCountryCode();
                    setOpen(false);
                })
                .catch(error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
        } else {
            axiosInstance.put(`${API_URL}/country/${dataById.id}`, values)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Country updated successfully.');
                    fetchCountryCode();
                    setOpen(false);
                })
                .catch(error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
        }
    };

    // Fetch countr code data on mount
    useEffect(() => {
        fetchCountryCode();
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Country code',
            dataIndex: 'flag',
            key: 'flag',
            render: (flag, record) => (
                <Space size="middle">
                    <img
                        src={flag}
                        alt={record.name}
                        style={{ width: '20px', marginRight: '10px' }}
                    />
                    {record.name}
                </Space>
            ),
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
                    <h2>Country Code</h2>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer()}>Add New Code</Button>
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

            {/* Drawer for adding/updating countr code */}
            <Drawer
                title={addNewMode ? "Add New Country" : "Update Country"}
                width={360}
                placement="right"
                onClose={() => setOpen(false)}
                open={open}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}>
                    <Form.Item
                        label="Country Code"
                        name="name"
                        rules={[{ required: true, message: 'Please enter Country Code!' }]}>
                        <Input placeholder="Enter Country Code" />
                    </Form.Item>
                    <Form.Item
                        label="Country Flag"
                        name="flag"
                        rules={[{ required: true, message: 'Please enter Country Code!' }]}>
                        <Input placeholder="Enter Country Code" />
                    </Form.Item>

                    {/* Additional Form Items can be added here if needed */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {addNewMode ? "Add Country" : "Update Country"}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default CountryCode;
