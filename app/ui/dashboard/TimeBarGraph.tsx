import React from 'react';
import { Bar } from '@ant-design/plots';
import { format } from 'fecha';
import { Card, Flex } from 'antd';

const TimeBarGraph = ({ data }: { 
    data: {
        startTimeStamp: number,
        endTimeStamp: number,
        name: string,
    }[] 
}) => {
    if(!data) {
        return <></>;
    }
    const formattedData = data.map(item => ({
        ...item,
        startTime: new Date(item.startTimeStamp / 1000000),
        endTime: new Date(item.endTimeStamp / 1000000),
    })).map((item) => {
        if(item.endTime > item.startTime) {
            return item;
        }else{
            return {
                ...item,
                endTime: new Date(item.startTime.getTime() + 1000),
            }
        }
    });

    const config = {
        data: formattedData,
        xField: 'name',
        yField: ['endTime', 'startTime'],
        slider: {
            y: { labelFormatter: (d: Date) => format(d, 'YYYY-MM-DD HH:mm:ss') },
            style:{
                handleIconSize: 5
            }
        },
        colorField: 'name',
        height: 300,
        animate: { enter: { type: 'waveIn' } },
    };
    return <Bar {...config}/>;
}

const TimeBarGraphCard = ({ data, style, title }: {
    data: {
        startTimeStamp: number,
        endTimeStamp: number,
        name: string,
    }[],
    style?: React.CSSProperties,
    title?: string
}) => {
    return (
        <Card bordered={false} style={style} >
            <Flex gap="small" vertical>
                <h4>{title}</h4>
                <TimeBarGraph data={data}  />
            </Flex>
        </Card>
    )
}

export default TimeBarGraphCard;