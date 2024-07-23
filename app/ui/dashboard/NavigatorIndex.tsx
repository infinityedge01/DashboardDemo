import React from "react";
import { Breadcrumb } from "antd";

export default function NavigatorIndex(
    { items }: {items: { name: string, href?: string }[]}
) {
    let breadcrumbItems = items.map(({ name, href }: { name: string, href?: string }) => {
        return (
            {
                title: href? <a href={href}>{name}</a> : name
            }
        )
    });
    return (
        <>
        <Breadcrumb style={{ margin: '16px 0' }} items = {breadcrumbItems} />
        </>
    )
}