import React from 'react';
import { Pie } from '@ant-design/plots';
import { format } from 'fecha';
import { Card, Flex } from 'antd';

const PieGraph = ({ data }: {
    data: {
        label: string,
        count: number
    }[]
}) => {
    if (!data) {
        return <></>;
    }
    const config = {
        data: data,
        angleField: 'count',
        colorField: 'label',
        innerRadius: 0.6,
        label: {
            text: (d: {
                label: string,
                count: number
            }) => `${d.count}`,
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'bottom',
                rowPadding: 0,
            }
        },
        annotations: [
            {
                type: 'text',
                style: {
                    text: '' + data.reduce((acc, item) => acc + item.count, 0),
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 20,
                    fontStyle: 'bold',
                },
            },
        ],
        height: 300,
    }
    
    return <Pie {...config} />;
}

const PieGraphCard = ({ data, style, title}: {
    data: {
        label: string,
        count: number,
    }[],
    style?: React.CSSProperties,
    title?: string,
}) => {
    return (
        <Card bordered={false} style={style} >
            <Flex gap="small" vertical>
                <h4>{title}</h4>
                <PieGraph data={data} />
            </Flex>
        </Card>
    )
}

export default PieGraphCard;