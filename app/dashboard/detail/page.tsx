"use client";

import './overview.css'
import React from 'react';
import NavigatorIndex from '@/app/ui/dashboard/NavigatorIndex';
import DataCards from '@/app/ui/dashboard/DataCards';
import loadData from '@/app/utils/loadData';
import withTheme from '../../../theme';
import TimeBarGraphCard from '@/app/ui/dashboard/TimeBarGraph';
import LineGraphCard from '@/app/ui/dashboard/LineGraph';
import PieGraphCard from '@/app/ui/dashboard/PieGraph';
import BarGraphCard from '@/app/ui/dashboard/BarGraph';
import NodeTable from '@/app/ui/dashboard/NodeTable';
import IPInfoTable from '@/app/ui/dashboard/IPInfoTable';
import FileInfoTable from '@/app/ui/dashboard/FileInfoTable';
import PDFViewerCard from '@/app/ui/dashboard/PDFViewerCard';
import InteractiveGraph from '@/app/ui/dashboard/InteractiveGraph';
import Page404 from '@/app/ui/dashboard/Page404';
import { Flex } from 'antd';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { useSearchParams } from "next/navigation";
import formatDuration from 'format-duration';
import { useRouter } from 'next/router';
import { Suspense } from 'react'
const StatisticOverview = (
    {
        name
    }: {
        name: string
    }
) => {
    const timeDataBaseStyle: React.CSSProperties = {
        width: '65%',
        minWidth: '400px',
    };

    const stageDataBaseStyle: React.CSSProperties = {
        width: '34%',
        minWidth: '200px',
    };

    const topCommandDataBaseStyle: React.CSSProperties = {
        width: '32%',
        minWidth: '200px',
    };

    const syscallDataBaseStyle: React.CSSProperties = {
        width: '32%',
        minWidth: '200px',
    };

    const ipDataBaseStyle: React.CSSProperties = {
        width: '34%',
        minWidth: '200px',
    };
    const [exampleData, setExampleData] = React.useState<any>(null);
    const [timeData, setTimeData] = React.useState<any>(null);
    const [timeGraphData, setTimeGraphData] = React.useState<any>(null);
    const [stageData, setStageData] = React.useState<{
        stage: string,
        count: number
    }[]>([]);
    const [topCommandData, setTopCommandData] = React.useState<{
        label: string,
        count: number
    }[]>([]);
    const [syscallData, setSyscallData] = React.useState<{
        syscall: string,
        count: number
    }[]>([]);
    const [ipData, setIpData] = React.useState<{
        ip: string,
        count: number
    }[]>([]);
    React.useEffect(() => {
        const data = loadData(`app/data/${name}/data.json`);
        data.then((response) => {
            const data_json = JSON.parse(response);
            let cardData = [];
            cardData.push(
                {
                    key: 'Total Commands',
                    value: data_json?.num_commands,
                },
                {
                    key: 'Total Connections',
                    value: data_json?.num_ip,
                },
                {
                    key: 'Total Files',
                    value: data_json?.num_file,
                },
                {
                    key: 'Duration',
                    value: formatDuration(data_json?.duration / 1000000, { leading: true }),
                },
            );
            setExampleData(cardData);
            setTimeData(data_json?.time_data);
            setTimeGraphData(data_json?.time_graph_data);
            setStageData(data_json?.stage_data);
            setTopCommandData(data_json?.top_command);
            setSyscallData(data_json?.syscall_data);
            setIpData(data_json?.ip_data);
        }).catch((error) => {
            console.error('Error loading data:', error);
        });
        return () => {
            // Cleanup
        }
    }, []);
    let stageData0 = stageData.map((item:
        {
            stage: string,
            count: number
        }
    ) => {
        return {
            label: item.stage,
            count: item.count
        }
    });
    let topCommandData0 = topCommandData.map((item:
        {
            label: string,
            count: number
        }
    ) => {
        return {
            label: item.label,
            count: item.count
        }
    });
    let syscallData0 = syscallData.map((item:
        {
            syscall: string,
            count: number
        }
    ) => {
        return {
            label: item.syscall,
            count: item.count
        }
    });
    let ipData0 = ipData.map((item:
        {
            ip: string,
            count: number
        }
    ) => {
        return {
            label: item.ip,
            count: item.count
        }
    });
    return (
        <>
            <h2>总览</h2>
            <DataCards props={exampleData} />
            <h2>统计数据</h2>
            <Flex gap="small" vertical>
                <Flex wrap gap="1%" vertical={false}>
                    <TimeBarGraphCard data={timeGraphData} style={timeDataBaseStyle} title={"时间分布"} />
                    <PieGraphCard data={stageData0} style={stageDataBaseStyle} title={"状态分布"} />
                </Flex>
                <Flex wrap gap="1%" vertical={false}>
                    <BarGraphCard data={topCommandData0} style={topCommandDataBaseStyle} title={"命令分布"} />
                    <PieGraphCard data={syscallData0} style={syscallDataBaseStyle} title={"系统调用类型分布"} />
                    <BarGraphCard data={ipData0} style={ipDataBaseStyle} title={"IP分布"} />
                </Flex>
            </Flex>
        </>
    );
};


const TableOverview = ({
    name
}: {
    name: string
}) => {
    const panelStyle: React.CSSProperties = {
        background: '#ffffff',
    };
    const items: CollapseProps['items'] = [
        {
            'key': '1',
            'label': '命令信息',
            'children': <NodeTable name={name} />,
        },
        {
            'key': '2',
            'label': '连接信息',
            'children': <IPInfoTable name={name} />,
        },
        {
            'key': '3',
            'label': '文件信息',
            'children': <FileInfoTable name={name} />,
        },
    ];
    return (
        <>
            <h2>详细信息</h2>
            <Collapse
                bordered={true}
                defaultActiveKey={['1']}
                style={{ background: '#ffffff' }}
                items={items}
            />
        </>
    );
}

const PDFOverview = (
    { filename }: { filename: string }
) => {
    return (
        <>
            <h2>报告PDF</h2>
            <PDFViewerCard filename={filename} />
        </>
    );
}

const InteractiveGraphOverview = ({
    name
}: {
    name: string
}) => {
    return (
        <>
            <h2>交互式图表</h2>
            <InteractiveGraph name={name} />
        </>
    );
}
function Search() {
    const searchParams = useSearchParams()

    return searchParams.get('name');
}

const DashBoardPage = () => {
    const [isDataValid, setIsDataValid] = React.useState<string>("loading");
    const searchParams = useSearchParams();
    let dataName: string = Search() ?? '';
    React.useEffect(() => {
        const dataList = loadData('app/data/data_list.json');
        dataList.then((response) => {
            const data_json = JSON.parse(response);
            let flag = false;
            if (data_json?.data.length > 0) {
                for (let i = 0; i < data_json?.data.length; i++) {
                    if (data_json?.data[i].name === dataName && dataName !== null) {
                        setIsDataValid("true");
                        flag = true;
                        break;
                    }
                }
            }
            if (!flag) {
                setIsDataValid("false");
            }
        }).catch((error) => {
            console.error('Error loading data:', error);
            setIsDataValid("false");
        });
        return () => {
            // Cleanup
        }
    }, []);


    return (
        <>
            <NavigatorIndex items={[
                { name: 'Home', href: '/' },
                { name: 'Dashboard', href: '/dashboard' },
                { name: dataName, href: `/dashboard/detail?name=${dataName}` },
            ]} />
            {isDataValid == "true" ? (
                <>
                    <Flex gap="middle" vertical>
                        <StatisticOverview name={dataName} />
                        <InteractiveGraphOverview name={dataName} />
                        <TableOverview name={dataName} />
                        <PDFOverview filename={`/dashboard/reports/${dataName}.pdf`} />
                    </Flex>
                </>
            ) : isDataValid == "false" ? (
                <>
                    <Page404 />
                </>
            ) :
                (
                    <>
                        Loading...
                    </>
                )}
        </>
    );
};
const DashBoardPageWithTheme = () => {

    return withTheme(<Suspense><DashBoardPage /></Suspense>);
}
export default DashBoardPageWithTheme;
