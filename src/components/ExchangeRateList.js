import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button, Col, Drawer, Form, Input, notification, Tag, Row, Select, Table, Space
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const axiosInstance = axios.create();

const ExchangeRateList = () => {
    const [data, setData] = useState([]);
    const [dataById, setDataById] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [addNewMode, setAddNewMode] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const API_URL = "http://localhost:8080";
    const [form] = Form.useForm();
    const [banks, setBanks] = useState([]);
    const [exchangeRateReport, setBanksExchangeRate] = useState([]);
    const [country, setCountry] = useState([]);
    const [exchangeRateBycountryCode, setExchangeRateBycountryCode] = useState([]);

    // Function to fetch banks list from the server
    const fetchExchangeRate = () => {
        axiosInstance.get(`${API_URL}/exchange-rate`)
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
        axiosInstance.get(`${API_URL}/exchange-rate/${id}`)
            .then(response => {
                setDataById(response.data);
                response.data.banks = response?.data?.banks?.id;
                response.data.country = response?.data?.country?.id;
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
        axiosInstance.delete(`${API_URL}/exchange-rate/${id}`)
            .then(() => {
                openNotificationWithIcon('success', 'Success', 'Bank deleted successfully.');
                fetchExchangeRate();
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

    // Submit form to add or update exchange-rate
    const handleSubmit = (values) => {
        values.banks = {"id": values.banks};
        values.country = {"id": values.country};
        if (addNewMode) {
            axiosInstance.post(`${API_URL}/exchange-rate`, values)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Bank added successfully.');
                    fetchExchangeRate();
                    setOpen(false);
                })
                .catch(error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
        } else {
            axiosInstance.put(`${API_URL}/exchange-rate/${dataById.id}`, values)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Bank updated successfully.');
                    fetchExchangeRate();
                    setOpen(false);
                })
                .catch(error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
        }
    };

    const handleBankChange = (value) => {
        axiosInstance.get(API_URL + "/exchange-rate/bank/" + value)
            .then(response => {
                    setData(response?.data?.content);
                    setLoading(false);
                },
                error => {
                    setLoading(false);
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
    };
    const handleCountryCodeChange = (value) => {
        axiosInstance.get(API_URL + "/exchange-rate/code/" + value)
            .then(response => {
                    setExchangeRateBycountryCode(response?.data?.content);
                    setLoading(false);
                },
                error => {
                    setLoading(false);
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
    };

    //Get all bank lists
    const getAllBanks = () => {
        axiosInstance.get(API_URL + "/banks")
            .then(response => {
                    const s = response?.data?.content;
                    setBanks(s);
                },
                error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
    };

    const getAllCountryCode = () => {
        axiosInstance.get(API_URL + "/country")
            .then(response => {
                    const s = response?.data?.content;
                    setCountry(s);
                },
                error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
    };


    //Get all bank exchange rate reports
    const getAllExchangeRateReportsGroupedByBanks = () => {
        axiosInstance.get(API_URL + "/banks/exchange-rate")
            .then(response => {
                    const s = response?.data;
                    setBanksExchangeRate(s);
                },
                error => {
                    openNotificationWithIcon('error', 'Error', error?.message);
                });
    };



    // Fetch banks data on mount
    useEffect(() => {
        fetchExchangeRate();
        getAllCountryCode();
        getAllExchangeRateReportsGroupedByBanks();
        getAllBanks();
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
            align: 'center', // Center align column text
        },
        {
            title: 'Code',
            dataIndex: 'country',
            key: 'country',
            render: country => (
                <Space size="middle">
                    <img
                        src={country.flag}
                        alt="flag"
                        style={{ width: '20px', marginRight: '10px' }}
                    />
                    {country.name}
                </Space>
            ),
        },
        {
            title: 'Buying',
            dataIndex: 'buying',
            key: 'buying',
            render: (text) => <Tag color="green">{text}</Tag>,
            align: 'center', // Center align column text
        },
        {
            title: 'Selling',
            dataIndex: 'selling',
            key: 'selling',
            render: (text) => <Tag color="red">{text}</Tag>,
            align: 'center', // Center align column text
        },
        {
            title: 'Difference',
            key: 'difference',
            render: (text, record) => (
                <Space size="middle">
                    ± {record.selling - record.buying}
                </Space>
            ),
            align: 'center', // Center align column text
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
            align: 'center', // Center align column text
        },
    ];
    const countryCodecolumns = [
        {
            title: 'Bank',
            dataIndex: 'banks',
            key: 'banks',
            render: banks => (
                <Space size="middle">
                    {banks.name}
                </Space>
            ),
        },
        {
            title: 'Buying',
            dataIndex: 'buying',
            key: 'buying',
            render: (text) => <Tag color="green">{text}</Tag>,
            align: 'center', // Center align column text
        },
        {
            title: 'Selling',
            dataIndex: 'selling',
            key: 'selling',
            render: (text) => <Tag color="red">{text}</Tag>,
            align: 'center', // Center align column text
        },
    ];

    return (
        <>
            {contextHolder}

            <Row gutter={[16, 16]} justify="center">
                <Col span={14}>
                    <h2>Exchange Rates</h2>
                </Col>
                <Col span={6}>
                    <Select
                        allowClear
                        showSearch
                        onChange={handleBankChange}
                        style={{ width: '100%' }}
                        placeholder="Please select bank"
                        options={banks?.map(banks => ({ label: banks.name, value: banks.id }))}
                    />
                </Col>
                <Col span={4}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer()}>
                        Add New Exchange Rate
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
                <Col span={24}>
                    <Table
                        style={{ width: '100%', marginTop: '20px' }}
                        loading={loading}
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                </Col>

                <Col span={6}>
                    <Select
                        allowClear
                        showSearch
                        onChange={handleCountryCodeChange}
                        style={{ width: '100%' }}
                        placeholder="Please select country code"
                        options={country?.map(country => ({ label: country.name, value: country.id }))}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        style={{ width: '100%', marginTop: '20px' }}
                        loading={loading}
                        columns={countryCodecolumns}
                        dataSource={exchangeRateBycountryCode}
                        rowKey="id"
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                </Col>
            </Row>

            {/* Drawer for adding/updating banks */}
            <Drawer
                title={addNewMode ? "Add New Exchange Rate" : "Update Exchange Rate"}
                width={360}
                placement="right"
                onClose={() => setOpen(false)}
                open={open}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Bank"
                        name="banks"
                    >
                        <Select
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select bank"
                            options={banks?.map(banks => ({ label: banks.name, value: banks.id }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Code"
                        name="country"
                    >
                        <Select
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select country code"
                            options={country?.map(country => ({ label: country.name, value: country.id }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Buying"
                        name="buying"
                        rules={[{ required: true, message: 'Please enter buying!' }, { pattern: /^[0-9]+(\.[0-9]+)?$/, message: 'Please enter a valid number for Values !' }]}
                    >
                        <Input placeholder="Enter buying" />
                    </Form.Item>
                    <Form.Item
                        label="Selling"
                        name="selling"
                        rules={[{ required: true, message: 'Please enter selling!' }, { pattern: /^[0-9]+(\.[0-9]+)?$/, message: 'Please enter a valid number for Values !' }]}
                    >
                        <Input placeholder="Enter selling" />
                    </Form.Item>

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

export default ExchangeRateList;
