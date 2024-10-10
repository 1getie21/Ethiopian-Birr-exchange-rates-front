import './App.css';
import React from 'react';
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import ExchangeRateList from "./components/ExchangeRateList";

const App = () => {
    return (
        <div className="app-container">
            <Header/>
            <ExchangeRateList/>
            <Footer/>
        </div>
    );
};
export default App;
// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import {Col, Row, Table, Space, notification, Card} from "antd";
// import './table.css';
//
// const axiosInstance = axios.create();
//
// const ExchangeRateList = () => {
//     const LIVE_URL = "http://10.10.10.231:5000/v1";
//     const [cbe, setCbe] = useState([]);
//     const [allBankExchangeRate, setAllBankExchangeRate] = useState([]);
//     const [allBanksBestExchangeRate, setAllBanksBestExchangeRate] = useState([]);
//     const [api, contextHolder] = notification.useNotification();
//
//     // Login function
//     const login = async () => {
//         const auth = {
//             password: 'test1234',
//             email: 'test3@test.et'
//         };
//
//         try {
//             const response = await axiosInstance.post(`${LIVE_URL}/users/login`, auth);
//             return response?.data?.token;
//         } catch (error) {
//             console.error("Login error:", error?.message);
//             api.error({message: 'Login failed', description: error?.message});
//             return null;
//         }
//     };
//
//     const getAllBanksExchangeRateData = async (token: any) => {
//         const auth = {
//             request: {
//                 bank_id: ["all"],
//                 from: ["all"],
//                 to: "BIRR"
//             }
//         };
// //
//         try {
//             const response = await axiosInstance.post(`${LIVE_URL}/forex/latest`, auth, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//
//             });
//             setAllBankExchangeRate(response?.data || []);
//         } catch (error) {
//             console.error("Fetch error:", error?.message);
//             api.error({message: 'Fetch failed', description: error?.message});
//         }
//     };
//     const getAllBanksBestExchangeRateData = async (token: any) => {
//         try {
//             const response = await axiosInstance.get(`${LIVE_URL}/forex/best`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             setAllBanksBestExchangeRate(response?.data || []);
//         } catch (error) {
//             console.error("Fetch error:", error?.message);
//             api.error({message: 'Fetch failed', description: error?.message});
//         }
//     };
//
//     // Fetch data on mount
//     useEffect(() => {
//         const initializeData = async () => {
//             try {
//                 const token = await login();
//                 if (token) {
//                     await Promise.all([
//                         getAllBanksBestExchangeRateData(token),
//                         getAllBanksExchangeRateData(token),
//                     ]);
//                 } else {
//                     console.error("No token available");
//                 }
//             } catch (error) {
//                 console.error("Error initializing data:", error);
//             }
//         };
//
//         initializeData();
//     }, []);
//
//     return (
//         <>
//             {contextHolder}
//             <Row gutter={[16, 16]} justify="center">
//                 <h1>Best transaction rates based on buying</h1>
//                 {allBanksBestExchangeRate.length === 0 && (
//                     <div align="center">No data</div>
//                 )}
//                 {allBanksBestExchangeRate.length > 0 && (
//                     <Table
//                         className="custom-table"
//                         style={{
//                             width: '100%',
//                             marginTop: '20px',
//                             marginLeft: '150px',
//                             marginRight: '150px',
//                         }}
//                         bordered
//                         dataSource={allBanksBestExchangeRate}
//                         pagination={false}
//                         columns={[
//                             {
//                                 title: 'currency',
//                                 dataIndex: 'currency',
//                                 key: 'currency',
//                                 align: 'center',
//                                 render: (text, record) => (
//                                     <Space size="middle">
//                                         <img
//                                             src={record.logo}
//                                             alt="Currency Logo"
//                                             style={{width: '20px', marginRight: '10px'}}
//                                         />
//                                         {text}
//                                     </Space>
//                                 ),
//                                 align: 'left',
//                             },
//                             {
//                                 title: 'buying',
//                                 dataIndex: 'buying',
//                                 key: 'buying',
//                                 align: 'center',
//                                 render: text => (
//                                     <span
//                                         style={{
//                                             color: '#3C763D',
//                                             fontWeight: 'bold',
//                                             backgroundColor: 'lightcyan',
//                                             padding: '2px 4px',
//                                             borderRadius: '3px'
//                                         }}>
//                                     {text?.value}
//                                 </span>
//                                 ),
//                             },
//
//                             {
//                                 title: 'selling',
//                                 dataIndex: 'selling',
//                                 key: 'selling',
//                                 align: 'center',
//                                 render: text => (
//                                     <span
//                                         style={{
//                                             color: '#3C763D',
//                                             fontWeight: 'bold',
//                                             backgroundColor: 'lightcyan',
//                                             padding: '2px 4px',
//                                             borderRadius: '3px'
//                                         }}>
//                                     {text?.value}
//                                 </span>
//                                 ),
//                             },
//                             {
//                                 title: 'bank',
//                                 dataIndex: 'selling',
//                                 key: 'selling',
//                                 align: 'center',
//                                 render: text => (
//
//                                     <span
//                                         style={{
//                                             color: 'blue',
//                                             fontWeight: 'bold',
//                                             padding: '2px 4px',
//                                             borderRadius: '3px'
//                                         }}>
//                                     {text?.bank}
//                                 </span>
//                                 ),
//                             },
//                         ]}
//                         rowKey="base" // Unique identifier for each row
//                     />
//                 )}
//             </Row>
//             <Row gutter={[16, 16]} justify="center">
//                 <h1>List of All Banks' Exchange Rate</h1>
//                 {allBankExchangeRate.length === 0 && (
//                     <div align="center">No data</div>
//                 )}
//                 {allBankExchangeRate.length > 0 && (
//
//                     <Col span={24}>
//                         {allBankExchangeRate.map((item) => (
//                             <Card key={item?.id}
//                                   style={{
//                                       marginLeft: '150px',
//                                       marginRight: '150px',
//                                   }}
//                                   title={
//                                       <div style={{
//                                           display: 'flex',
//                                           justifyContent: 'space-between',
//                                           marginLeft: '60px',
//                                           marginRight: '60px'
//                                       }}>
//                                           <div style={{textAlign: 'left'}}>
//                                               <p>{item?.bank_name} ({item?.bank_id}) Transaction Rate</p>
//                                           </div>
//                                           <div style={{textAlign: 'right'}}>
//                                               <p>
//                                                   Last Updated: {new Date(item?.trn_date).toLocaleDateString('en-US', {
//                                                   weekday: 'short',
//                                                   year: 'numeric',
//                                                   month: 'long',
//                                                   day: 'numeric'
//                                               })}
//                                               </p>
//                                           </div>
//                                       </div>}>
//
//                                 <Table
//                                     className="custom-table"
//                                     style={{width: '100%', marginTop: '20px'}}
//                                     bordered
//                                     dataSource={item?.rate}
//                                     pagination={false}
//                                     columns={[
//                                         {
//                                             title: 'Code',
//                                             dataIndex: 'base',
//                                             key: 'base',
//                                             render: (text, record) => (
//                                                 <Space size="middle">
//                                                     <img
//                                                         src={record.logo}
//                                                         alt="Currency Logo"
//                                                         style={{width: '20px', marginRight: '10px'}}
//                                                     />
//                                                     {text}
//                                                 </Space>
//                                             ),
//                                             align: 'left',
//                                         },
//                                         {
//                                             title: 'Buying',
//                                             dataIndex: 'buying',
//                                             key: 'buying',
//                                             align: 'center',
//                                             render: text => (
//                                                 <span
//                                                     style={{
//                                                         color: '#3C763D',
//                                                         fontWeight: 'bold',
//                                                         backgroundColor: 'lightcyan',
//                                                         padding: '2px 4px',
//                                                         borderRadius: '3px'
//                                                     }}>
//                                                 {text}
//                                             </span>
//                                             ),
//                                         },
//                                         {
//                                             title: 'Selling',
//                                             dataIndex: 'selling',
//                                             key: 'selling',
//                                             align: 'center',
//                                             render: text => (
//                                                 <span
//                                                     style={{
//                                                         color: '#9B111E',
//                                                         fontWeight: 'bold',
//                                                         backgroundColor: '#ffcccb',
//                                                         padding: '2px 4px',
//                                                         borderRadius: '3px'
//                                                     }}>
//                                                 {text}
//                                             </span>
//                                             ),
//                                         },
//                                         {
//                                             title: 'Difference',
//                                             key: 'difference',
//                                             render: (text, record) => {
//                                                 const difference = (record.selling - record.buying).toFixed(2);
//                                                 let formattedDifference;
//
//                                                 if (difference > 0) {
//                                                     formattedDifference = `+${difference}`; // Positive value
//                                                 } else if (difference < 0) {
//                                                     formattedDifference = difference; // Negative value
//                                                 } else {
//                                                     formattedDifference = '0'; // Omit signs for zero
//                                                 }
//
//                                                 return (
//                                                     <Space size="middle">
//                                                         <strong>{formattedDifference}</strong> {/* Bold value here */}
//                                                     </Space>
//                                                 );
//                                             },
//                                             align: 'center',
//                                         },
//                                     ]}
//                                     rowKey="base" // Unique identifier for each row
//                                 />
//
//                             </Card>
//                         ))}
//                     </Col>
//                 )}
//             </Row>
//         </>
//     );
// };
//
// export default ExchangeRateList;

