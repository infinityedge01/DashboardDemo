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

import InteractiveGraph from '@/app/ui/dashboard/InteractiveGraph';
import { Flex} from 'antd';
import { Collapse} from 'antd';
import type { CollapseProps } from 'antd';

const StatisticOverview = () => {
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
    const data = loadData('app/data/example.json');
    data.then((response) => {
      const data_json = JSON.parse(response);
      let cardData = [];
      cardData.push(
        {
          key: 'Total Nodes',
          value: data_json?.num_nodes,
        },
        {
          key: 'Total Edges',
          value: data_json?.num_edges,
        },
        {
          key: 'Stages',
          value: data_json?.stages.length,
        },
        {
          key: 'Total Score',
          value: data_json?.total_score,
        }
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
      <DataCards props={exampleData}/>
      <h2>统计数据</h2>
      <Flex gap="small" vertical>
        <Flex wrap gap="1%" vertical={false}>
            <TimeBarGraphCard data={timeGraphData} style={timeDataBaseStyle} title={"时间分布"}/>
            <PieGraphCard data={stageData0} style={stageDataBaseStyle} title={"状态分布"}/>
        </Flex>
        <Flex wrap gap="1%" vertical={false}>
            <BarGraphCard data={topCommandData0} style={topCommandDataBaseStyle} title={"命令分布"} />
            <PieGraphCard data={syscallData0} style={syscallDataBaseStyle} title={"系统调用类型分布"}/>
            <BarGraphCard data={ipData0} style={ipDataBaseStyle} title={"IP分布"} />
        </Flex>
      </Flex>
    </>
  );
};


const TableOverview = () => {
  const panelStyle: React.CSSProperties = {
    background: '#ffffff',
  };
  const items: CollapseProps['items'] = [
    {
      'key': '1',
      'label': '节点信息',
      'children': <NodeTable />,
    },
    {
      'key': '2',
      'label': '连接信息',
      'children': <></>,
    },
    {
      'key': '3',
      'label': '文件信息',
      'children': <></>,
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

const InteractiveGraphOverview = () => {
  return (
    <>
      <h2>交互式图表</h2>
      <InteractiveGraph />
    </>
  );
}
const DashBoardPage = () => {
  return (
    <>
      <NavigatorIndex items={ [{ name: 'Home', href: '/' }, { name: 'Dashboard'}] } />
      <Flex gap="middle" vertical>
        <StatisticOverview />
        <InteractiveGraphOverview />
        <TableOverview />
      </Flex>
    </>
  );
};
const DashBoardPageWithTheme = () => withTheme(<DashBoardPage />);
export default DashBoardPageWithTheme;
