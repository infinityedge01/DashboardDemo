import React from "react";
import { Flex, Radio } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
const cardBaseStyle: React.CSSProperties = {
    width: '24%',
    minWidth: '200px',
    fontWeight: 'bold',
};

export default function DataCards(
    {props}: {props: {key: string, value: number}[]}
) {
    if (!props) {
        return <Card bordered={false}></Card>;
    }
    const listitems = props.map((item) => {
        return (
            <Statistic
                title={item.key}
                value={item.value}
                style={cardBaseStyle}
                key={item.key}
            />
        )
    });
    return (
        <>
            <Card bordered={false}>
                <Flex gap="small" vertical>
                    <Flex wrap gap="1%" vertical={false}>
                        {listitems}
                    </Flex>
                </Flex>
            </Card>
        </>
    )
}