"use client";

import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
    setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import React from 'react';
type LoginType = 'phone' | 'account';

export default () => {
    const { token } = theme.useToken();
    const iconStyles: React.CSSProperties = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };

    return (
        <ProConfigProvider hashed={false}>
            <div style={{ backgroundColor: token.colorBgContainer }}>
                <LoginForm
                    title="溯源分析Demo"
                >
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                    </div>
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                                
                                statusRender: (value) => {
                                    const getStatus = () => {
                                        if (value && value.length > 12) {
                                            return 'ok';
                                        }
                                        if (value && value.length > 6) {
                                            return 'pass';
                                        }
                                        return 'poor';
                                    };
                                    const status = getStatus();
                                    if (status === 'pass') {
                                        return (
                                            <div style={{ color: token.colorWarning }}>
                                                强度：中
                                            </div>
                                        );
                                    }
                                    if (status === 'ok') {
                                        return (
                                            <div style={{ color: token.colorSuccess }}>
                                                强度：强
                                            </div>
                                        );
                                    }
                                    return (
                                        <div style={{ color: token.colorError }}>强度：弱</div>
                                    );
                                },
                            }}
                            placeholder={'密码: ant.design'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};