"use client";

import './overview.css'
import React from 'react';
import NavigatorIndex from '@/app/ui/dashboard/NavigatorIndex';
import DataCards from '@/app/ui/dashboard/DataCards';

import { Flex } from 'antd';
const DashBoardPage = () => {
  return (
    <>
      <NavigatorIndex items={ [{ name: 'Home', href: '/' }, { name: 'Overview'}] } />
      <Flex gap="middle" vertical>
        <h1>Overview</h1>
        <DataCards />
      </Flex>

    </>
  );
};

export default DashBoardPage;
