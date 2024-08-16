

import React from "react";
import { Flex, Radio } from 'antd';
import { Card } from 'antd';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import path from "path"

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const PDFViewerCard = (
    { filename }: { filename: string }
) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    console.log(path.join(process.cwd(), filename))
    return (
        <Card>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div style={{ height: '1000px' }}>
                    <Viewer
                        fileUrl={filename}
                        plugins={[
                            defaultLayoutPluginInstance,
                        ]}
                    />
                </div>
            </Worker>
        </Card>
    )
}

export default PDFViewerCard