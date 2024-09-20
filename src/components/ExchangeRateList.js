import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Button, Col, Tag, Row, Table, Space, notification, Card
} from "antd";
// import './table.css';

const axiosInstance = axios.create();

const ExchangeRateList = () => {
    const LIVE_URL = "http://10.10.10.231:5000/v1";
    const [cbe, setCbe] = useState([]);
    const [allBankExchangeRate, setAllBankExchangeRate] = useState([]);
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
    // Fetch data on mount
    useEffect(() => {
        login().then(() => {
            getAllCbeExchangeRateData();
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
                    {text}
                </Space>
            ),
            align: 'center',
        },
        {
            title: 'Buying',
            dataIndex: 'buying',
            key: 'buying',
            align: 'center',
        },
        {
            title: 'Selling',
            dataIndex: 'selling',
            key: 'selling',

            align: 'center',
        }
    ];
    if (!allBankExchangeRate.length) {
        return <div>No data available</div>; // Optional message if there's no data
    }
    return (
        <>
            {contextHolder}
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
                                        align: 'center',
                                    },
                                    {
                                        title: 'Buying Rate',
                                        dataIndex: 'buying',
                                        key: 'buying',
                                        align: 'center',
                                    },
                                    {
                                        title: 'Selling Rate',
                                        dataIndex: 'selling',
                                        key: 'selling',
                                        align: 'center',
                                    },
                                    {
                                        title: 'Difference',
                                        key: 'difference',
                                        render: (text, record) => (
                                            <Space size="middle">
                                                {/*±*/}
                                                {(record.selling - record.buying).toFixed(2)}
                                            </Space>
                                        ),
                                        align: 'center', // Center align column text
                                    }
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
