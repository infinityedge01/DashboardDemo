import React from 'react';
import { Line } from '@ant-design/plots';
import { format } from 'fecha';
import { Card, Flex } from 'antd';

const LineGraph = ({ data }: { 
    data: {
        time: number,
        count: number
    }[] 
}) => {
    if(!data) {
        return <></>;
    }
    const formattedData = data.map(item => ({
        ...item,
        time: new Date(item.time * 1000)
    }));
    const config = {
        data: formattedData,
        xField: 'time',
        yField: 'count',
        shapeField: 'vh',
        axis:{
            x: { title: false, size: 40 }, 
            y: { title: false, size: 36 }
        },
        slider: {
            x: { labelFormatter: (d: Date) => format(d, 'YYYY-MM-DD HH:mm:ss') },
            style:{
                handleIconSize: 5
            }
        },
        height: 300,
        style: {
            lineWidth: 2,
        },
        animate: { enter: { type: 'waveIn' } }
    }
    return <Line {...config}/>;
}

const LineGraphCard = ({ data, style, title }: {
    data: {
        time: number,
        count: number
    }[],
    style?: React.CSSProperties,
    title?: string
}) => {
    return (
        <Card bordered={false} style={style} >
            <Flex gap="small" vertical>
                <h4>{title}</h4>
                <LineGraph data={data}  />
            </Flex>
        </Card>
    )
}

export default LineGraphCard;