import React from "react";
import { Flex, Radio } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';


export default function DataCards(
    {props}: {props: {key: string, value: number}[]}
) {
    if (!props) {
        return <Card bordered={false}></Card>;
    }
    const cardBaseStyle: React.CSSProperties = {
        width: props.length > 1 ? (100 / props.length - 1).toString() + '%' : '100%',
        minWidth: '200px',
        fontWeight: 'bold',
    };
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