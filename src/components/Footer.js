import React from 'react';
import {Layout, Row, Col} from 'antd';
import {MailOutlined, PhoneOutlined, InstagramOutlined, LinkedinOutlined} from '@ant-design/icons';
import './Footer.css'; // Custom CSS for styling


const Footer = () => {
    return (
        <div
            style={{
                textAlign: "center",
                color: "white",
                background: "linear-gradient(to right, rgba(10, 141, 255, 1), rgba(1, 5, 46, 0.98) 70%)",
                fontWeight: "bold",
                padding: "20px",
            }}
            className="footer">
        <div className="footer-content"   >
{/*                /!*<Row gutter={[16, 16]}>*!/*/}
{/*                /!*    /!* Left section with logos *!/*!/*/}
{/*                /!*    <Col xs={24} sm={12} md={8}>*!/*/}
{/*                /!*        <div className="footer-logos">*!/*/}
{/*                /!*            <img src="https://www.wegagen.com/assets/logo-52a79204.png"*!/*/}
{/*                /!*                 alt="Wegagen Bank"/>*!/*/}
{/*                /!*            <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossless,ret_img/https://www.bankofabyssinia.com/wp-content/uploads/2020/10/Asset-7@2x.png"*!/*/}
{/*                /!*                 alt="Bank of Abyssinia"/>*!/*/}
{/*                /!*        </div>*!/*/}
{/*                /!*    </Col>*!/*/}
{/*                */}
{/*                /!*    /!* Middle section with description and contact *!/*!/*/}
{/*                /!*    <Col xs={24} sm={12} md={8}>*!/*/}
{/*                /!*        <div className="footer-middle">*!/*/}
{/*                /!*            <h3>Banks Ethiopia</h3>*!/*/}
{/*                /!*            <p>*!/*/}
{/*                /!*                Banks Ethiopia is a website owned by Afro Affiliate PLC.*!/*/}
{/*                /!*                Built to make your bank-related decisions easier.*!/*/}
{/*                /!*            </p>*!/*/}
{/*                /!*            <p>*!/*/}
{/*                /!*                <b>Email us:</b> contact@banksethiopia.com <br/>*!/*/}
{/*                /!*                <b>Contact us:</b> +2519...*!/*/}
{/*                /!*            </p>*!/*/}
{/*                /!*        </div>*!/*/}
{/*                /!*    </Col>*!/*/}
{/*                */}
{/*                /!*    /!* Right section with bank links *!/*!/*/}
{/*                /!*    <Col xs={24} sm={12} md={8}>*!/*/}
{/*                /!*        <Row>*!/*/}
{/*                /!*            <Col span={8}>*!/*/}
{/*                /!*                <h4>Top Banks in Ethiopia</h4>*!/*/}
{/*                /!*                <ul>*!/*/}
{/*                /!*                    <li>Awash Bank</li>*!/*/}
{/*                /!*                    <li>Dashen Bank</li>*!/*/}
{/*                /!*                    <li>Bank of Abyssinia</li>*!/*/}
{/*                /!*                    <li>Commercial Bank of Ethiopia</li>*!/*/}
{/*                /!*                </ul>*!/*/}
{/*                /!*            </Col>*!/*/}
{/*                /!*            <Col span={8}>*!/*/}
{/*                /!*                <h4>Best Diaspora Bank Accounts</h4>*!/*/}
{/*                /!*                <ul>*!/*/}
{/*                /!*                    <li>Commercial Bank of Ethiopia</li>*!/*/}
{/*                /!*                    <li>Awash Bank</li>*!/*/}
{/*                /!*                    <li>Hibret Bank</li>*!/*/}
{/*                /!*                </ul>*!/*/}
{/*                /!*            </Col>*!/*/}
{/*                /!*            <Col span={8}>*!/*/}
{/*                /!*                <h4>Business Banks in Ethiopia</h4>*!/*/}
{/*                /!*                <ul>*!/*/}
{/*                /!*                    <li>Awash Bank</li>*!/*/}
{/*                /!*                    <li>Bank of Abyssinia</li>*!/*/}
{/*                /!*                    <li>Dashen Bank</li>*!/*/}
{/*                /!*                    <li>Zemen Bank</li>*!/*/}
{/*                /!*                </ul>*!/*/}
{/*                /!*            </Col>*!/*/}
{/*                /!*        </Row>*!/*/}
{/*                /!*    </Col>*!/*/}
{/*                /!*</Row>*!/*/}
{/*<hr/>*/}
                {/* Footer bottom - social icons and contact */}
                <Row justify="center" className="footer-bottom">
                    <Col xs={24} sm={12} md={8}>
                        <p>Connect with us</p>
                        <p>
                            <MailOutlined/> contact@banksethiopia.com <br/>
                            <PhoneOutlined/> +2519......
                        </p>
                        <div className="footer-social-icons">
                            <InstagramOutlined style={{fontSize: '20px', margin: '0 10px'}}/>
                            <LinkedinOutlined style={{fontSize: '20px', margin: '0 10px'}}/>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer-bottom-credit">
                Designed & Developed by: ...
            </div>
        </div>
    );
};

export default Footer;
