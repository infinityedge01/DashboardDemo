import React from 'react';
import loadData from '@/app/utils/loadData';
import { Table, Flex } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
    key: React.Key;
    id: string;
    source: string;
    dest: string;
    cmd: string;
}

const columns: TableColumnsType<DataType> = [
    { title: 'Source', dataIndex: 'source', key: 'source', ellipsis: true },
    { title: 'Destination', dataIndex: 'dest', key: 'dest' , ellipsis: true},
    { title: 'NodeID', dataIndex: 'id', key: 'id', ellipsis: true },
    { title: 'Label', dataIndex: 'cmd', key: 'cmd', ellipsis: true },
    Table.EXPAND_COLUMN,
];

const IPInfoTable = ({
    name
    }: { 
        name: string   
    }) => {
    const [data, setData] = React.useState<DataType[]>([]);
    React.useEffect(() => {
        const data = loadData(`app/data/${name}/ipinfo.json`);
        data.then((response) => {
            const data_json = JSON.parse(response);
            let nodeData = data_json?.map((item: { key: string, id: string, source: string, dest: string, cmd: string}) => {
                return {
                    key: item.key,
                    id: item.id,
                    source: item.source,
                    dest: item.dest,
                    cmd: item.cmd,
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
                        <h3>NodeID</h3>
                        <p>{record.id}</p>
                        <h3>Command</h3>
                        <p>{record.cmd}</p>
                    </Flex>
                </>,
            }}
        />
    );
}

export default IPInfoTable;