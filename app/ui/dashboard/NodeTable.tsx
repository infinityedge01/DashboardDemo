import React from 'react';
import loadData from '@/app/utils/loadData';
import { Table, Flex } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
    key: React.Key;
    id: string;
    stage: string;
    score: number;
    label: string;
}

const columns: TableColumnsType<DataType> = [
    { title: 'NodeID', dataIndex: 'id', key: 'id', ellipsis: true },
    { title: 'Stage', dataIndex: 'stage', key: 'stage', ellipsis: true },
    { title: 'Score', dataIndex: 'score', key: 'score' , ellipsis: true},
    { title: 'Label', dataIndex: 'label', key: 'label', ellipsis: true },
    Table.EXPAND_COLUMN,
];

const NodeTable = ({
    name
    }: { 
        name: string   
    }) => {
    const [data, setData] = React.useState<DataType[]>([]);
    React.useEffect(() => {
        const data = loadData(`app/data/${name}/node.json`);
        data.then((response) => {
            const data_json = JSON.parse(response);
            let nodeData = data_json?.map((item: { id: string, stage: string, score: string, label: string}) => {
                return {
                    key: item.id,
                    id: item.id,
                    stage: item.stage,
                    score: item.score,
                    label: item.label,
                }
            });
            setData(nodeData);
        }).catch((error) => {
            console.error('Error loading data:', error);
        });
        return () => {
            // Cleanup
        }
    }, []);
    return (
        <Table 
            columns={columns}
            dataSource={data} 
            expandable={{
                expandedRowRender: (record) => <>
                    <Flex vertical gap={"middle"}>
                        <h3>Label</h3>
                        <p>{record.label}</p>
                        <h3>Description</h3>
                        <p>待添加</p>
                    </Flex>
                </>,
            }}
        />
    );
}

export default NodeTable;