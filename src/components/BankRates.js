import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Tooltip, Divider, Popconfirm, notification } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles.css'; // Import your CSS file here

const API_URL = "/db.json"; // Adjust path as needed to your local JSON file

const BankRates = ({ onUpdate }) => {
    const [data, setData] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Open notification function
    const openNotificationWithIcon = (type, title, description) => {
        notification[type]({
            message: title,
            description,
        });
    };

    // Fetch data from local JSON file
    const getAllData = () => {
        axios.get(API_URL)
            .then(response => {
                // Extract bankRates from the response
                setData(response.data.bankRates);
            })
            .catch(error => {
                openNotificationWithIcon('error', 'Error', 'Failed to fetch data.');
                console.error('Fetch error:', error); // Log error to console for debugging
            });
    };

    // Calculate deference
    const calculateDeference = (buyingRate, sellingRate) => {
        return sellingRate - buyingRate;
    };

    // Add new record
    const addNewRecord = (values) => {
        const deference = calculateDeference(values.buyingRate, values.sellingRate);
        const newData = { ...values, id: Date.now(), deference };
        setData([...data, newData]);
        openNotificationWithIcon('success', 'Success', 'New record added successfully.');
        if (onUpdate) onUpdate([...data, newData]);
    };

    // Update existing record
    const updateRecordById = (values, id) => {
        const deference = calculateDeference(values.buyingRate, values.sellingRate);
        const updatedData = data.map(item => (item.id === id ? { ...item, ...values, deference } : item));
        setData(updatedData);
        openNotificationWithIcon('success', 'Success', 'Record updated successfully.');
        if (onUpdate) onUpdate(updatedData);
    };

    // Delete record
    const handleDelete = (id) => {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        openNotificationWithIcon('success', 'Success', 'Record deleted successfully.');
        if (onUpdate) onUpdate(updatedData);
    };

    // Handle form submission
    const handleOk = () => {
        form.validateFields().then(values => {
            if (editingRecord) {
                updateRecordById(values, editingRecord.id);
            } else {
                addNewRecord(values);
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    // Handle modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Handle form value changes
    const handleValuesChange = (changedValues) => {
        const { buyingRate, sellingRate } = changedValues;
        if (buyingRate !== undefined || sellingRate !== undefined) {
            const currentValues = form.getFieldsValue();
            const newDeference = calculateDeference(buyingRate || currentValues.buyingRate, sellingRate || currentValues.sellingRate);
            form.setFieldsValue({ deference: newDeference });
        }
    };

    // Columns for Table component
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
        },
        {
            title: 'Buying Rate',
            dataIndex: 'buyingRate',
            key: 'buyingRate',
        },
        {
            title: 'Selling Rate',
            dataIndex: 'sellingRate',
            key: 'sellingRate',
        },
        {
            title: 'Deference',
            dataIndex: 'deference',
            key: 'deference',
            render: deference => `± ${deference.toFixed(2)}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Tooltip title="Update Record">
                        <a onClick={() => {
                            setEditingRecord(record);
                            form.setFieldsValue(record);
                            setIsModalVisible(true);
                        }} style={{ marginRight: 8 }}>
                            <EditOutlined style={{ fontSize: '16px' }} />
                        </a>
                    </Tooltip>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are you sure to delete this record?"
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete Record">
                            <a>
                                <DeleteOutlined style={{ fontSize: '16px', color: "red" }} />
                            </a>
                        </Tooltip>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    useEffect(() => {
        getAllData(); // Fetch initial data
    }, []);

    return (
        <div>
            <Card
                title="Bank Rates"
                extra={<Button icon={<PlusOutlined />} onClick={() => {
                    setEditingRecord(null);
                    form.resetFields();
                    setIsModalVisible(true);
                }} type="primary">Add New</Button>}
            >
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey="id"
                />
            </Card>

            <Modal
                title={editingRecord ? 'Edit Bank Rate' : 'Add Bank Rate'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                wrapClassName="right-aligned-modal" // Apply the custom class here if needed
            >
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={handleValuesChange} // Update deference on value change
                >
                    <Form.Item
                        name="bank"
                        label="Bank"
                        rules={[{ required: true, message: 'Please enter the bank name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="buyingRate"
                        label="Buying Rate"
                        rules={[{ required: true, message: 'Please enter the buying rate' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="sellingRate"
                        label="Selling Rate"
                        rules={[{ required: true, message: 'Please enter the selling rate' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name="deference"*/}
                    {/*    label="Deference"*/}
                    {/*>*/}
                    {/*    <Input type="number" disabled />*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </div>
    );
};

export default BankRates;
