import React from 'react';
import { Bar } from '@ant-design/plots';
import { format } from 'fecha';
import { Card, Flex } from 'antd';

const BarGraph = ({ data, color }: {
    data: {
        label: string,
        count: number
    }[],
    color?: string
}) => {
    if (!data) {
        return <></>;
    }
    let data0 = [];
    for (let i = 0; i < Math.min(data.length, 10); i++) {
        data0.push({
            label: data[i].label,
            count: data[i].count
        })
    }
    let max_count = data.reduce((acc, item) => Math.max(acc, item.count), 0);
    const config = {
        data: data0,
        xField: 'label',
        yField: 'count',
        sort: {
            reverse: true,
            by: 'y',
        },
        label: {
            text: (d: { label: string, count: number }) => `${d.count}`,
            style: {
                textAnchor: (d: { label: string, count: number }) => (+d.count > 0.2 * max_count ? 'right' : 'start'),
                fill: (d: { label: string, count: number }) => (+d.count > 0.2 * max_count ? '#fff' : '#000'),
                dx: (d: { label: string, count: number }) => (+d.count > 0.2 * max_count ? -5 : 15),
            },
        },
        axis: {
            y: {
                title: false,
            },
        },
        colorField: 'label',
        legend: false,
        height: 250,
    }
    return <Bar {...config} />;
}

const BarGraphCard = ({ data, style, title, color}: {
    data: {
        label: string,
        count: number
    }[],
    style?: React.CSSProperties,
    title?: string,
    color?: string
}) => {
    return (
        <Card bordered={false} style={style} >
            <Flex gap="small" vertical>
                <h4>{title}</h4>
                <BarGraph data={data} color={color}/>
            </Flex>
        </Card>
    )
}

export default BarGraphCard;