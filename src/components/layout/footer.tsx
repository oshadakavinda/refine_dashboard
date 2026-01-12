import React from 'react';
import { Space, Typography } from 'antd';

const { Text, Link } = Typography;

const Footer: React.FC = () => {
    return (
        <div style={{
            padding: '20px 24px',
            background: '#001529',
            color: '#fff',
            width: '100%',
            textAlign: 'center'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Logo */}
                <div>
                    <img
                        src="/1.2.png"
                        alt="Company Logo"
                        style={{ height: '40px', maxWidth: '100%' }}
                    />
                </div>

                {/* Links */}
                <Space size="middle" wrap style={{ justifyContent: 'center' }}>
                    <Link href="#" style={{ color: '#fff' }}>About Us</Link>
                    <Link href="#" style={{ color: '#fff' }}>Contact</Link>
                    <Link href="#" style={{ color: '#fff' }}>Privacy Policy</Link>
                    <Link href="#" style={{ color: '#fff' }}>Terms of Service</Link>
                </Space>

                {/* Copyright */}
                <div>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px' }}>
                        © {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default Footer;
