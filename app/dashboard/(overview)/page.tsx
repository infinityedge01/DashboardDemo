"use client";

import React from 'react';
import withTheme from '../../../theme';
import NavigatorIndex from '../../ui/dashboard/NavigatorIndex';
import { Flex, Card } from 'antd';
import { EventDataMeta, EventDataOverview } from '@/app/lib/definitions';
import loadData from '@/app/utils/loadData';
import DataCards from '@/app/ui/dashboard/DataCards';
import TimeBarGraphCard from '@/app/ui/dashboard/TimeBarGraph';
import BarGraphCard from '@/app/ui/dashboard/BarGraph';
import EventTable from '@/app/ui/dashboard/EventTable';
const WelComeCard = () => {
    return (
        <Card title="Welcome">
            <p>Welcome to the dashboard!</p>
        </Card>
    );
}

const StatisticOverview = ({
    dataList
}: {
    dataList: EventDataOverview[]
}) => {
    let cardData = [];
    cardData.push(
        {
            key: 'Total Events',
            value: dataList.length,
        }
    );
    cardData.push(
        {
            key: 'Total Commands',
            value: dataList.reduce((acc, cur) => acc + cur.data.num_commands, 0),
        }
    );
    cardData.push(
        {
            key: 'Total Connections',
            value: dataList.reduce((acc, cur) => acc + cur.data.num_ip, 0),
        }
    );
    cardData.push(
        {
            key: 'Total Files',
            value: dataList.reduce((acc, cur) => acc + cur.data.num_file, 0),
        }
    );
    const timeDataBaseStyle: React.CSSProperties = {
        width: '65%',
        minWidth: '400px',
    };
    const topCommandDataBaseStyle: React.CSSProperties = {
        width: '34%',
        minWidth: '200px',
    };
    let timeData = dataList.map((item) => {
        return {
            name: item.name,
            startTimeStamp: item.data.start_time,
            endTimeStamp: item.data.end_time,
        }
    }).sort((a, b) => a.startTimeStamp - b.startTimeStamp);
    let topCommandData = dataList.map((item) => {
        return {
            label: item.name,
            count: item.data.num_commands,
        }
    }).sort((a, b) => b.count - a.count).slice(0, 10);

    return (
        <Flex gap="middle" vertical>
            <h2>总览</h2>
            <DataCards props={cardData} />
            <Flex gap="1%">
                <TimeBarGraphCard data={timeData} style={timeDataBaseStyle} title = "事件时间轴"/>
                <BarGraphCard data={topCommandData} style={topCommandDataBaseStyle} title="事件数top10" />
            </Flex>
        </Flex>
    );
}

const EventTableOverview = ({
    dataList
}: {
    dataList: EventDataOverview[]
}) => {
    return (
        <Flex gap="middle" vertical>
            <h2>事件列表</h2>
            <EventTable dataList={dataList}/>
        </Flex>
    );
}
const DashBoard = () => {
    const [dataList, setDataList] = React.useState<EventDataOverview[]>([]);
    React.useEffect(() => {
        const dataList = loadData('app/data/data_list.json');
        dataList.then((response) => {
            const data_json = JSON.parse(response);
            setDataList(data_json?.data);
        }).catch((error) => {
            console.error('Error loading data:', error);
        });
    }, []);

    return (
        <>
            <NavigatorIndex items={[
                { name: 'Home', href: '/' },
                { name: 'Dashboard', href: '/dashboard' },
            ]} />
            {
                dataList.length > 0 ?
                    <Flex gap="middle" vertical>
                        <StatisticOverview dataList={dataList} />
                        <EventTableOverview dataList={dataList} />
                    </Flex>
                    : <>
                        <WelComeCard />
                        <h2>Loading...</h2>
                    </>
            }
        </>
    );
}

const DashBoardWithTheme = () => withTheme(<DashBoard />);
export default DashBoardWithTheme;