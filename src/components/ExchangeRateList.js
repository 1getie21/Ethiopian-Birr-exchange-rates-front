import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Button, Col, Tag, Row, Table, Space, notification, Card
} from "antd";
import './table.css';

const axiosInstance = axios.create();

const ExchangeRateList = () => {
    const LIVE_URL = "http://10.10.10.231:5000/v1";
    const [cbe, setCbe] = useState([]);
    const [allBankExchangeRate, setAllBankExchangeRate] = useState([]);
    const [allBanksBestExchangeRate, setAllBanksBestExchangeRate] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    // Login function
    const login = async () => {
        const auth = {
            password: 'test1234',
            email: 'test3@test.et'
        };

        try {
            const response = await axiosInstance.post(`${LIVE_URL}/users/login`, auth);
            localStorage.setItem("token", response?.data?.token);
        } catch (error) {
            console.error("Login error:", error?.message);
            api.error({message: 'Login failed', description: error?.message});
        }
    };

    // Fetch exchange rates
    const getAllCbeExchangeRateData = async () => {
        const auth = {
            request: {
                bank_id: ["cbe"],
                from: ["all"],
                to: "BIRR"
            }
        };

        try {
            const response = await axiosInstance.post(`${LIVE_URL}/forex/latest`, auth, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}` // Use Bearer token
                }
            });
            setCbe(response?.data[0]?.rate || []);
        } catch (error) {
            console.error("Fetch error:", error?.message);
            api.error({message: 'Fetch failed', description: error?.message});
        }
    };
    const getAllBanksExchangeRateData = async () => {
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
                    'Authorization': `${localStorage.getItem("token")}` // Use Bearer token
                }
            });
            setAllBankExchangeRate(response?.data);
        } catch (error) {
            console.error("Fetch error:", error?.message);
            api.error({message: 'Fetch failed', description: error?.message});
        }
    };
    // };
    const getAllBanksBestExchangeRateData = async () => {


        try {
            const response = await axiosInstance.get(`${LIVE_URL}/forex/best`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}` // Use Bearer token
                }
            });
            setAllBanksBestExchangeRate(response?.data);
        } catch (error) {
            console.error("Fetch error:", error?.message);
            api.error({message: 'Fetch failed', description: error?.message});
        }
    };
    // Fetch data on mount
    useEffect(() => {
        login().then(() => {
            // getAllCbeExchangeRateData();
            getAllBanksBestExchangeRateData();
            getAllBanksExchangeRateData();
        });
    }, []);

    // Table columns
    const cbeDataColumn = [
        {
            title: 'Code',
            dataIndex: 'base',
            key: 'base',
            render: (text, record) => (
                <Space size="middle">
                    <img
                        src={record.logo}
                        alt="Currency Logo"
                        style={{width: '20px', marginRight: '10px'}}
                    />
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
        }
    ];
    if (!allBankExchangeRate.length) {
          <div align="center">No data</div>;
    }
    return (
        <>
            {contextHolder}
            <Row>
                <h3>Best transaction rates for USD, EUR & GBP based on buying</h3>
                if (!allBanksBestExchangeRate.length) {
                <div align="center">No data</div>; // Optional message if there's no data
            }
                if (allBanksBestExchangeRate.length) {
                <Table
                    className="custom-table"
                    style={{width: '100%', marginTop: '20px'}}
                    bordered
                    dataSource={allBanksBestExchangeRate}
                    pagination={false}
                    columns={[
                        {
                            title: 'currency',
                            dataIndex: 'currency',
                            key: 'currency',


                            render: (text, record) => (
                                <Space size="middle">
                                    {text}
                                </Space>
                            ),
                            align: 'left',
                        },
                        {
                            title: 'value',
                            dataIndex: 'value',
                            key: 'value',
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
                            title: 'bank',
                            dataIndex: 'bank',
                            key: 'bank',
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
                    ]}
                    rowKey="base" // Unique identifier for each row
                />
            }
            </Row>
            <Row gutter={[16, 16]} justify="center">
                <h1>List of All Banks' Exchange Rate</h1>
                <Col span={24}>
                    {allBankExchangeRate.map((item) => (
                        <Card key={item.id}
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
                                      <div style={{textAlign: 'left'}}>
                                          <p>{item.bank_name} ({item.bank_id}) Transaction Rate</p>
                                      </div>
                                      <div style={{textAlign: 'right'}}>
                                          <p>
                                              Last Updated: {new Date(item.trn_date).toLocaleDateString('en-US', {
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
                                style={{width: '100%', marginTop: '20px'}}
                                bordered
                                dataSource={item.rate}
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
                                                    style={{width: '20px', marginRight: '10px'}}
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
                                                //     style={{
                                                //         color: 'green',
                                                //         fontWeight: 'bold',
                                                //         background: "linear-gradient(to right, rgba(10, 141, 255, 1), rgba(1, 5, 46, 0.98) 70%)",
                                                //         padding: '2px 4px',
                                                //         borderRadius: '3px',
                                                //     }}
                                                // >
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
                                                //     style={{
                                                //         color: 'red',
                                                //         fontWeight: 'bold',
                                                //         background: "linear-gradient(to right, rgba(255, 0, 0, 1), rgba(1, 5, 46, 0.98) 70%)",
                                                //         padding: '2px 4px',
                                                //         borderRadius: '3px',
                                                //     }}
                                                // >
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
                                        title: 'Difference',
                                        key: 'difference',
                                        render: (text, record) => {
                                            const difference = (record.selling - record.buying).toFixed(2);
                                            let formattedDifference;

                                            if (difference > 0) {
                                                formattedDifference = `+${difference}`; // Positive value
                                            } else if (difference < 0) {
                                                formattedDifference = difference; // Negative value
                                            } else {
                                                formattedDifference = '0'; // Omit signs for zero
                                            }

                                            return (
                                                <Space size="middle">
                                                    <strong>{formattedDifference}</strong> {/* Bold value here */}
                                                </Space>
                                            );
                                        },
                                        align: 'center',
                                    },
                                ]}
                                rowKey="base" // Unique identifier for each row
                            />

                        </Card>
                    ))}
                </Col>
            </Row>
        </>
    );
};

export default ExchangeRateList;
