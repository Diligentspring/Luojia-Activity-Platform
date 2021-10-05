import PageContainer from '../../components/PageContainer';
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import React from 'react';

const Publish = () => {
  return (
    <PageContainer>
      <Card style={{ padding: 20, width: '80%' }}>
        <Form>
          <Form.Item name="title" label="活动名称">
            <Input></Input>
          </Form.Item>
          <Row gutter={64}>
            <Col>
              <Form.Item name="createTime" label="开始时间">
                <DatePicker showTime={true}></DatePicker>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="cutOffTime" label="截止时间">
                <DatePicker showTime={true}></DatePicker>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={185} style={{ width: '100%' }}>
            <Col>
              <Form.Item name="participantsNeeded" label="招募人数">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="participantsAlready" label="已有人数">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="location" label="活动地点">
            <Input />
          </Form.Item>
          <Form.Item name="desc" label="活动描述">
            <Input.TextArea />
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary">提交</Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Publish;
