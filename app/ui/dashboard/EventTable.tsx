import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { EventDataOverview, EventDataMeta } from '@/app/lib/definitions';
import Link from 'next/link';
interface DataType {
    key: string;
    name: string;
    num_commands: number;
    num_ip: number;
    num_file: number;
    start_time: number;
    end_time: number;
}

type DataIndex = keyof DataType;

const EventTable = ({
    dataList
}: {
    dataList: EventDataOverview[]
}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            ...getColumnSearchProps('name'),
            render: (text, record) => <Link href={`/dashboard/detail?name=${record.name}`} >
                <p style={{
                    color: '#1890ff',
                    cursor: 'pointer',
                }}>{text}</p >
            </Link>,
        },
        {
            title: 'Commands',
            dataIndex: 'num_commands',
            key: 'num_commands',
            width: '15%',
            sorter: (a, b) => a.num_commands - b.num_commands,
        },
        {
            title: 'Connections',
            dataIndex: 'num_ip',
            key: 'num_ip',
            width: '15%',
            sorter: (a, b) => a.num_ip - b.num_ip,
        },
        {
            title: 'Files',
            dataIndex: 'num_file',
            key: 'num_file',
            width: '15%',
            sorter: (a, b) => a.num_file - b.num_file,
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
            width: '15%',
            render: (text) => new Date(text / 1000000).toLocaleString(),
            sorter: (a, b) => a.start_time - b.start_time,
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'end_time',
            width: '15%',
            render: (text) => new Date(text / 1000000).toLocaleString(),
            sorter: (a, b) => a.end_time - b.end_time,
        },
    ];
    let formatted_data = dataList.map((item) => {
        return {
            key: item.id,
            name: item.name,
            num_commands: item.data.num_commands,
            num_ip: item.data.num_ip,
            num_file: item.data.num_file,
            start_time: item.data.start_time,
            end_time: item.data.end_time,
        }
    });
    return <Table columns={columns} dataSource={formatted_data} />;
};

export default EventTable;