"use client";


import React from 'react';
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Flex, Layout, Menu, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import { signOut } from '@/auth';
import { logout } from '../lib/actions';
const { Header, Footer, Content } = Layout;


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Layout>
                    <Header
                        style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div className="demo-logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            items={[

                            ]}
                            style={{ flex: 1, minWidth: 0 }}
                        />
                        <Button
                            type="primary"
                            icon={<LogoutOutlined />}
                            onClick={
                                () => {
                                    logout();
                                }
                            }
                        >
                            退出登录
                        </Button>
                    </Header>
                    <Content style={{ padding: '0 48px' }}>
                        <AntdRegistry>{children}</AntdRegistry>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ©{new Date().getFullYear()} Created by dzm
                    </Footer>
                </Layout>
            </body>
        </html>
    )
}