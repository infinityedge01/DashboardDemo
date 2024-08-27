import React from 'react';
import { Card, Flex, List } from 'antd';
import { Typography } from 'antd';
import { ExtensionCategory, Graph, register, IPointerEvent, NodeData, NodeEvent, NodeOptions } from '@antv/g6';
import { GNode, Group, Image, Rect, Text, ReactNode } from '@antv/g6-extension-react';
import { Interface } from 'readline';
import { CodeOutlined, FileOutlined, LinkOutlined } from '@ant-design/icons';
import loadData from '@/app/utils/loadData';
import { Affix } from 'antd';
import { ConfigProvider } from 'antd';
import { min } from 'date-fns/min';
register(ExtensionCategory.NODE, 'g', GNode);
register(ExtensionCategory.NODE, 'react', ReactNode);

interface NodeSize {
    width: number;
    height: number;
}

interface MyNodeData {
    id: string;
    label: string;
    score: string;
    stage: string;
    type: string;
    selected: boolean | undefined;
    description: string;
};

interface MyEdgeData {
    source: string;
    target: string;
    id: string;
    time: string;
    syscall: string;
}

interface GraphData {
    nodes: MyNodeData[];
    edges: MyEdgeData[];
}

const CustomMyNodeData = (
    { data, size }: { data: MyNodeData, size: NodeSize }
) => {
    if (data.type === 'command') {
        return (
            <>
                <Group key={0} transform={`translate(${(0 * size.width) / 3}, 0)`}>
                    <Text text={data.stage} fontSize={12} fill={'black'} />
                    <Text text={"Score: " + data.score} fontSize={12} dy={16} fill="gray" />
                </Group>
            </>
        );
    }
}

const CustomNode = ({ data, size }: {
    data: {
        id: string,
        data: MyNodeData,
    }, size: NodeSize
}) => {
    const { width, height } = size;
    const { id, label, score, stage, type } = data.data;
    const color = ((type: string) => {
        if (type == 'command') {
            switch (stage) {
                case 'Initial Compromise':
                    return '#BF242A';
                case 'Internal Reconnaissance':
                    return '#EA5506';
                case 'Escalate Privilege':
                    return '#C89932';
                case 'Establish Foothold':
                    return '#028760';
                case 'Maintain Persistence':
                    return '#007BBB';
                default:
                    return '#7D7D7D';
            }
        } else {
            return '#65318E';
        }
    })(type);

    const radius = 4;
    return (
        <Group>
            <Rect width={width} height={height} stroke={data.data.selected ? color : '#000000'} fill={'white'} radius={radius}>
                <Rect width={width} height={20} stroke={data.data.selected ? color : '#000000'} fill={color} radius={[radius, radius, 0, 0]}>
                    <Image
                        src={
                            type === 'command'
                                ? 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ'
                                : 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ'
                        }
                        x={2}
                        y={2}
                        width={16}
                        height={16}
                    />
                    <Text text={label.slice(0, 20)} textBaseline="top" fill="#fff" fontSize={14} dx={20} dy={2} />
                </Rect>
                <Group transform="translate(5,40)">
                    <CustomMyNodeData data={data.data} size={size} />
                </Group>
            </Rect>
        </Group>
    )
}

const G6Graph = (
    { graphData, setGraph }: { graphData: GraphData | null, setGraph: (graph: Graph) => void }
) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        let graph: Graph = new Graph({
            container: containerRef.current!,
            width: graphData?.nodes.length? Math.min(graphData?.nodes.length * 100, 3000) : 3000,
            height: 2000,
            data: {
                nodes: graphData?.nodes.map((node) => ({
                    id: node.id,
                    data: {
                        id: node.id,
                        label: node.label,
                        score: node.score,
                        stage: node.stage,
                        type: node.type,
                        description: node.description,
                    },
                })),
                edges: graphData?.edges.map((edge) => ({
                    source: edge.source,
                    target: edge.target,
                    id: edge.id,
                    data: {
                        time: edge.time,
                        syscall: edge.syscall,
                    },
                })),
            },
            node: {
                type: 'g',
                style: {
                    size: [180, 60],
                    isSelected: false,
                    component: (data: any) =>
                        <CustomNode data={data} size={{ width: 180, height: 60 }} />,
                },
                palette: {
                    type: 'group',
                    field: (d: any) => d.combo,
                },
            },
            edge: {
                type: 'cubic-vertical',
                style: {
                    endArrow: true,
                    labelText: (edge: any) => {
                        return edge.data.syscall + '\n' + edge.data.time;
                    },

                },
            },
            layout: {
                type: 'antv-dagre',
                ranksep: 50,
                nodesep: 5,
                sortByCombo: false,
            },
            behaviors: ['zoom-canvas', 'drag-canvas',
                'click-select',
            ],
        });
        setGraph(graph);

        let promise = graph.render();
        return () => {
            promise.then(() => {
                graph.destroy();
            });
        }
    }, [graphData]);
    return <div ref={containerRef} style={{
        width: '100%',
        minHeight: '500px',
        overflow: 'scroll',
    }} />;
}

interface GraphInfoData {
    nodeData: MyNodeData | null;
    edgeData: MyEdgeData | null;
}

const GraphInfo = (
    { graph }: { graph: Graph | null },
) => {
    const [data, setData] = React.useState<GraphInfoData | null>(null);
    if (graph === null) {
        return <></>;
    }

    graph.on(NodeEvent.CLICK, (e: IPointerEvent) => {
        console.log('Node clicked:', e);
        let selectedNodes = graph.getElementDataByState('node', 'selected');
        let unSelectedNodes = graph.getData().nodes.filter((node: any) => {
            if (selectedNodes.length === 0) {
                return true;
            }
            return node.id !== selectedNodes[0].id;
        }
        );
        for (let node of unSelectedNodes) {
            if (node.data && node.data.selected) {
                graph.updateNodeData([{
                    id: node.id,
                    data: {
                        ...node.data,
                        selected: false,
                    }
                }]);
            }
            setData(null);
        }
        if (selectedNodes.length > 0) {
            graph.updateNodeData([{
                id: selectedNodes[0].id,
                data: {
                    ...selectedNodes[0].data,
                    selected: true,
                }
            }]);
            setData(
                {
                    nodeData: {
                        id: selectedNodes[0].data?.id as string,
                        label: selectedNodes[0].data?.label as string,
                        score: selectedNodes[0].data?.score as string,
                        stage: selectedNodes[0].data?.stage as string,
                        type: selectedNodes[0].data?.type as string,
                        selected: selectedNodes[0].data?.selected as boolean,
                        description: selectedNodes[0].data?.description as string,
                    },
                    edgeData: null,
                }
            )
        }
        // graph.draw().then(() => {
        //     console.log('draw finished');
        //     if (selectedNodes.length > 0) {
        //         console.log('Selected node:', selectedNodes[0]);
        //     }
        // });
    });
    if (data === null) {
        return <><h3>点击节点查看详细信息</h3></>;
    }
    if (data.nodeData !== null) {
        let listdata = [
            {
                key: 'ID',
                title: 'ID',
                value: data.nodeData.id,
            },
            {
                key: 'Label',
                title: '命令',
                value: data.nodeData.label,
            },
            {
                key: 'Stage',
                title: '阶段',
                value: data.nodeData.stage,
            },
            {
                key: 'Score',
                title: '分数',
                value: data.nodeData.score,
            },
            {
                key: 'Description',
                title: '描述',
                value: data.nodeData.description == 'null' ? '无' : data.nodeData.description,
            }
        ]
        return (
            <div style={{
                height: '500px',
                overflow: 'scroll',
            }}>
                <h3>节点信息</h3>
                <ConfigProvider
                    theme={{
                        components: {
                            List: {
                                /* 这里是你的组件 token */
                                itemPadding: '5px 0px',
                                metaMarginBottom: '0px',
                            },
                        },
                    }}
                >
                    <List
                        itemLayout='vertical'
                        dataSource={listdata}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}
                                />
                                <Typography.Paragraph copyable>{item.value}</Typography.Paragraph>
                            </List.Item>
                        )}

                    />
                </ConfigProvider>
            </div>
        )
    }
}

const InteractiveGraph = ({
    name
    }: { 
        name: string   
    }) => {
    const [graphData, setGraphData] = React.useState<GraphData | null>(null);
    const [graph, setGraph] = React.useState<Graph | null>(null);
    React.useEffect(() => {
        const data = loadData(`app/data/${name}/graph.json`);
        data.then((response) => {
            const data_json = JSON.parse(response);
            let commandData = data_json?.commands;
            let connectData = data_json?.connects;
            let fileData = data_json?.files;
            let MynodeData = commandData.concat(connectData).concat(fileData);
            let MyedgeData = data_json?.edges;
            setGraphData({
                nodes: MynodeData,
                edges: MyedgeData,
            });

        }).catch((error) => {
            console.error('Error loading data:', error);
        });
        return () => {
            // Cleanup
        }
    }
        , []);
    const graphStyle: React.CSSProperties = {
        width: '70%',
        minWidth: '400px',
    };
    const infoStyle: React.CSSProperties = {
        width: '29%',
        minWidth: '400px',
    };


    return (
        <Flex gap="1%">
            <Card bordered={true} style={graphStyle}>
                <G6Graph graphData={graphData} setGraph={setGraph} />
            </Card>
            <Card bordered={true} style={infoStyle}>
                <GraphInfo graph={graph} />
            </Card>
        </Flex>

    );
}

export default InteractiveGraph;