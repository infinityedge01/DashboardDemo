import React from 'react';
import { Card } from 'antd';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { GNode, Group, Image, Rect, Text } from '@antv/g6-extension-react';
import { Interface } from 'readline';
import { CodeOutlined, FileOutlined, LinkOutlined } from '@ant-design/icons';
import loadData from '@/app/utils/loadData';
import { Affix } from 'antd';
import Meta from 'antd/es/card/Meta';
register(ExtensionCategory.NODE, 'g', GNode);

interface NodeSize {
    width: number;
    height: number;
}

interface NodeData {
    id: string;
    label: string;
    score: string;
    stage: string;
    type: string;
};

interface EdgeData {
    source: string;
    target: string;
    id: string;
    time: string;
    syscall: string;
}

interface GraphData{
    nodes: NodeData[];
    edges: EdgeData[];
}

const CustomNodeData = (
    {data, size} : {data: NodeData, size: NodeSize}
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

const CustomNode = ({ data, size }: { data: {
    id: string,
    data: NodeData,
}, size: NodeSize }) => {
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
            <Rect width={width} height={height} stroke={color} fill={'white'} radius={radius}>
                <Rect width={width} height={20} fill={color} radius={[radius, radius, 0, 0]}>
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
                    <Text text = {id.slice(0, 16)} textBaseline="top" fill="#fff" fontSize={14} dx={20} dy={2} />
                </Rect>
                <Group transform="translate(5,40)">
                    <CustomNodeData data={data.data} size={size} />
                </Group>
            </Rect>
        </Group>
    )
}




const G6Graph = (
    { graphData }: { graphData: GraphData | null }
) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        let graph = new Graph({
            container: containerRef.current!,
            width: 2000,
            height: 1000,
            data: {
                nodes: graphData?.nodes.map((node) => ({ 
                    id: node.id, 
                    data: {
                        id: node.id,
                        label: node.label,
                        score: node.score,
                        stage: node.stage,
                        type: node.type,
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
            node :{
                type: 'g',
                style: {
                    size: [180, 60],
                    component: (data: any) => 
                    <CustomNode data={data} size={{width: 180, height: 60}} />,
                },
            },
            edge :{
                type: 'cubic-vertical',
                style: {
                    endArrow: true,
                    labelText: (edge: any) => {
                        return edge.data.syscall;
                    },

                },
            },
            layout: {
                type: 'antv-dagre',
                ranksep: 50,
                nodesep: 5,
                sortByCombo: true,
            },
            behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
        });
        let promise = graph.render();
        return () => {
            promise.then(() => {
                graph.destroy();
            });
        }
    }, [graphData]);
    return <div ref={containerRef} style = {{
        width: '100%',
        minHeight: '500px',
        overflow: 'scroll',
    }}/>;
}

const InteractiveGraph = () => {
    const [graphData, setGraphData] = React.useState<GraphData | null>(null);

    React.useEffect(() => {
        const data = loadData('app/data/example_graph.json');
        data.then((response) => {
            const data_json = JSON.parse(response);
            let commandData = data_json?.commands;
            let connectData = data_json?.connects;
            let fileData = data_json?.files;
            let nodeData = commandData.concat(connectData).concat(fileData);
            let edgeData = data_json?.edges;
            setGraphData({
                nodes: nodeData,
                edges: edgeData,
            });

        }).catch((error) => {
            console.error('Error loading data:', error);
        });
        return () => {
            // Cleanup
        }
    }
    , []);

    return (
        <Card bordered={false}>
            <G6Graph graphData={graphData}/>
        </Card>
    );
}

export default InteractiveGraph;