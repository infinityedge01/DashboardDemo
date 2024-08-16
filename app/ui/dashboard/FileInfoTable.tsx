import React from 'react';
import loadData from '@/app/utils/loadData';
import { Table, Flex } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
    key: React.Key;
    id: string;
    filename: string;
    cmd: string;
}

const columns: TableColumnsType<DataType> = [
    { title: 'Source', dataIndex: 'filename', key: 'filename', ellipsis: true },
    { title: 'NodeID', dataIndex: 'id', key: 'id', ellipsis: true },
    { title: 'Label', dataIndex: 'cmd', key: 'cmd', ellipsis: true },
    Table.EXPAND_COLUMN,
];

const FileInfoTable = ({
    name
    }: { 
        name: string   
    }) => {
    const [data, setData] = React.useState<DataType[]>([]);
    React.useEffect(() => {
        const data = loadData(`app/data/${name}/fileinfo.json`);
        data.then((response) => {
            const data_json = JSON.parse(response);
            let nodeData = data_json?.map((item: { key: string, id: string, filename: string, cmd: string}) => {
                return {
                    key: item.key,
                    id: item.id,
                    filename: item.filename,
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
                        <h3>FileName</h3>
                        <p>{record.filename}</p>
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

export default FileInfoTable;