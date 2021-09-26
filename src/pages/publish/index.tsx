import { PageContainer } from "@ant-design/pro-layout";
import { Card, DatePicker, Form, Input } from "antd";
import React from "react";

const Publish = () => {
    return <PageContainer>
        <Card>
            <Form>
                <Form.Item name="title" label="活动名称">
                    <Input>
                    </Input>
                </Form.Item>
                <Form.Item name="createTime" label="开始时间">
                    <DatePicker showTime={true}></DatePicker>
                </Form.Item>
                <Form.Item name="title" label="活动名称">
                   <Input />
                </Form.Item>
            </Form>
        </Card>
    </PageContainer>
}

export default Publish