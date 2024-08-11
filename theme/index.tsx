"use client";

import React from "react";
import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => (
    <>
      <ConfigProvider
        theme={{
          token: {
          },
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 8,
            },
            components: {
              Statistic: {
                titleFontSize: 16,
                contentFontSize: 24
              },
            },
          }}
        >
          {node}
        </ConfigProvider>
      </ConfigProvider>
    </>
  )

export default withTheme;