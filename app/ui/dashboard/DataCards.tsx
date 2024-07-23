import React from "react";
import { Flex, Radio } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
const baseStyle: React.CSSProperties = {
    width: '25%',
};

export default function DataCards() {
    const [value, setValue] = React.useState<string>('horizontal');
    return (
        <>
            <Flex gap="middle" vertical={false}>
                <Card bordered={false} style={baseStyle}>
                    <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                        />
                </Card>
            </Flex>
        </>
    )
}