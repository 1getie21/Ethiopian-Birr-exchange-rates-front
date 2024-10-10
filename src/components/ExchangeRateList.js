import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Table, Space, notification, Card } from "antd";
import './table.css';

const axiosInstance = axios.create();

const ExchangeRateList = () => {
    const LIVE_URL = "http://10.10.10.231:5000/v1";
    const [allBankExchangeRate, setAllBankExchangeRate] = useState([]);
    const [allBanksBestExchangeRate, setAllBanksBestExchangeRate] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    // Function to log in and return the token
    const login = async () => {
        const auth = {
            "password": "test123",
            "email": "test3@wisetech.et"
        };

        try {
            const response = await axiosInstance.post(`${LIVE_URL}/users/login`, auth);
            const token = response?.data?.token;

            if (token) {
                localStorage.setItem('authToken', token); // Store token
                return token;
            } else {
                throw new Error('Token not found');
            }
        } catch (error) {
            console.error("Login error:", error);
            api.error({ message: 'Login failed', description: error.message });
            return null;
        }
    };

    // Function to fetch all exchange rates
    const fetchExchangeRates = async (token) => {
        await Promise.all([
            getAllBanksExchangeRateData(token),
            getAllBanksBestExchangeRateData(token),
        ]);
    };

    const getAllBanksExchangeRateData = async (token) => {
        const auth = {
            request: {
                bank_id: ["all"],
                from: ["all"],
                to: "BIRR"
            }
        };

        try {
            const response = await axiosInstance.post(`${LIVE_URL}/forex/latest`, auth, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            setAllBankExchangeRate(response?.data || []);
        } catch (error) {
            console.error("Fetch error:", error);
            api.error({ message: 'Fetch failed', description: error.message });
        }
    };

    const getAllBanksBestExchangeRateData = async (token) => {
        try {


            const response = await axiosInstance.get(`${LIVE_URL}/forex/best`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setAllBanksBestExchangeRate(response?.data || []);
        } catch (error) {
            console.error("Fetch error:", error);
            api.error({ message: 'Fetch failed', description: error.message });
        }
    };

    // Fetch data on mount
    useEffect(() => {
        const initializeData = async () => {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

            if (token) {
                await fetchExchangeRates(token); // Fetch data using the stored token
            } else {
                localStorage.removeItem('authToken');
                const newToken = await login(); // Trigger login if no token is found
                if (newToken) {
                    await fetchExchangeRates(newToken); // Fetch data with new token
                }
            }
        };

        initializeData(); // Call the initialization function
    }, []);

    return (
        <>
            {contextHolder}
            <Row gutter={[16, 16]} justify="center">
                <h1>Best transaction rates </h1>
                {allBanksBestExchangeRate.length === 0 && (
                    <div align="center">No data</div>
                )}
                {allBanksBestExchangeRate.length > 0 && (
                    <Table
                        className="custom-table"
                        style={{
                            width: '100%',
                            marginTop: '20px',
                            marginLeft: '150px',
                            marginRight: '150px',
                        }}
                        bordered
                        dataSource={allBanksBestExchangeRate}
                        pagination={false}
                        columns={[
                            {
                                title: 'currency',
                                dataIndex: 'currency',
                                key: 'currency',
                                align: 'center',
                                render: (text, record) => (
                                    <Space size="middle">
                                        <img
                                            src={record.logo}
                                            alt="Currency Logo"
                                            style={{ width: '20px', marginRight: '10px' }}
                                        />
                                        {text}
                                    </Space>
                                ),
                                align: 'left',
                            },
                            {
                                title: 'buying',
                                dataIndex: 'buying',
                                key: 'buying',
                                align: 'center',
                                render: text => (
                                    <span
                                        style={{
                                            color: '#3C763D',
                                            fontWeight: 'bold',
                                            backgroundColor: 'lightcyan',
                                            padding: '2px 4px',
                                            borderRadius: '3px'
                                        }}>
                                        {text?.value}
                                    </span>
                                ),
                            },
                            {
                                title: 'selling',
                                dataIndex: 'selling',
                                key: 'selling',
                                align: 'center',
                                render: text => (
                                    <span
                                        style={{
                                            color: '#9B111E',
                                            fontWeight: 'bold',
                                            backgroundColor: '#ffcccb',
                                            padding: '2px 4px',
                                            borderRadius: '3px'
                                        }}>
                                        {text?.value}
                                    </span>
                                ),
                            },
                            {
                                title: 'bank',
                                dataIndex: 'selling',
                                key: 'selling',
                                align: 'center',
                                render: text => (
                                    <span
                                        style={{
                                            color: 'blue',
                                            fontWeight: 'bold',
                                            padding: '2px 4px',
                                            borderRadius: '3px'
                                        }}>
                                        {text?.bank}
                                    </span>
                                ),
                            },
                        ]}
                        rowKey="base"
                    />
                )}
            </Row>
            <Row gutter={[16, 16]} justify="center">
                <h1>List of All Banks' Exchange Rate</h1>
                {allBankExchangeRate.length === 0 && (
                    <div align="center">No data</div>
                )}
                {allBankExchangeRate.length > 0 && (
                    <Col span={24}>
                        {allBankExchangeRate.map((item) => (
                            <Card key={item?.id}
                                  style={{
                                      marginLeft: '150px',
                                      marginRight: '150px',
                                  }}
                                  title={
                                      <div style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          marginLeft: '60px',
                                          marginRight: '60px'
                                      }}>
                                          {/*<div style={{ textAlign: 'left' }}>*/}
                                          {/*    <p>{item?.bank_name} ({item?.bank_id}) Transaction Rate</p>*/}
                                          {/*</div>*/}
                                          <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                                              <img
                                                  src={item?.bank_logo} // Ensure the logo is fetched correctly
                                                  alt="Bank Logo"
                                                  style={{ width: '30px', height: '30px', marginRight: '10px' }} // Adjust size and margin as needed
                                              />
                                              <p>{item?.bank_name} ({item?.bank_id}) Transaction Rate</p>
                                          </div>
                                          <div style={{ textAlign: 'right' }}>
                                              <p>
                                                  Last Updated: {new Date(item?.trn_date).toLocaleDateString('en-US', {
                                                  weekday: 'short',
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric'
                                              })}
                                              </p>
                                          </div>
                                      </div>}>

                                <Table
                                    className="custom-table"
                                    style={{ width: '100%', marginTop: '20px' }}
                                    bordered
                                    dataSource={item?.rate}
                                    pagination={false}
                                    columns={[
                                        {
                                            title: 'Code',
                                            dataIndex: 'base',
                                            key: 'base',
                                            render: (text, record) => (
                                                <Space size="middle">
                                                    <img
                                                        src={record.logo}
                                                        alt="Currency Logo"
                                                        style={{ width: '20px', marginRight: '10px' }}
                                                    />
                                                    {text}
                                                </Space>
                                            ),
                                            align: 'left',
                                        },
                                        {
                                            title: 'Buying',
                                            dataIndex: 'buying',
                                            key: 'buying',
                                            align: 'center',
                                            render: text => (
                                                <span
                                                    style={{
                                                        color: '#3C763D',
                                                        fontWeight: 'bold',
                                                        backgroundColor: 'lightcyan',
                                                        padding: '2px 4px',
                                                        borderRadius: '3px'
                                                    }}>
                                                {text}
                                            </span>
                                            ),
                                        },
                                        {
                                            title: 'Selling',
                                            dataIndex: 'selling',
                                            key: 'selling',
                                            align: 'center',
                                            render: text => (
                                                <span
                                                    style={{
                                                        color: '#9B111E',
                                                        fontWeight: 'bold',
                                                        backgroundColor: '#ffcccb',
                                                        padding: '2px 4px',
                                                        borderRadius: '3px'
                                                    }}>
                                                {text}
                                            </span>
                                            ),
                                        },
                                        {
                                            title: 'Spread',
                                            key: 'spread',
                                            render: (text, record) => {
                                                const difference = (record.selling - record.buying).toFixed(2);
                                                let formattedDifference;

                                                if (difference > 0) {
                                                    formattedDifference = `+${difference}`;
                                                } else if (difference < 0) {
                                                    formattedDifference = difference;
                                                } else {
                                                    formattedDifference = '0';
                                                }

                                                return (
                                                    <Space size="middle">
                                                        <strong>{formattedDifference}</strong>
                                                    </Space>
                                                );
                                            },
                                            align: 'center',
                                        },
                                    ]}
                                    rowKey="base"
                                />
                            </Card>
                        ))}
                    </Col>
                )}
            </Row>
        </>
    );
};

export default ExchangeRateList;
