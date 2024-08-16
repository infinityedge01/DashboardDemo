import React from 'react';
import { Button, Result } from 'antd';
import Link from "next/link"

const Page404 = ({
    homeLink = '/dashboard',
}) => (
    <Result
        status="404"
        title="404"
        subTitle="你所访问的页面不存在"
        extra={
            <Link href={homeLink}> 
                <Button
                    type="primary"
                    >
                    回到主页
                </Button>
            </Link>
    }
    />
);

export default Page404;