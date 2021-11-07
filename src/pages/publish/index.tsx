import PageContainer from '../../components/PageContainer';
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, message } from 'antd';
import { publishApplication } from '@/services/publish';
import Activity, { ActivityProps } from '@/components/Activity';
import React, { useState } from 'react';

const Publish = () => {
  const [formValue, setFormValue] = useState<ActivityProps>();

  const [myForm] = Form.useForm<ActivityProps>();

  return (
    <PageContainer>
      <Card style={{ padding: 20, width: '80%' }}>
        <Form form={myForm}>
          <Form.Item name="title" label="活动名称">
            <Input></Input>
          </Form.Item>
          <Row gutter={64}>
            <Col>
              <Form.Item name="createTime" label="活动开始时间">
                <DatePicker showTime={true}></DatePicker>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="cutOffTime" label="活动结束时间">
                <DatePicker showTime={true}></DatePicker>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={64}>
            <Col>
              <Form.Item name="start" label="报名开始时间">
                <DatePicker showTime={true}></DatePicker>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="deadline" label="报名结束时间">
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
          </Row>

          <Form.Item name="location" label="活动地点">
            <Input />
          </Form.Item>
          <Form.Item name="desc" label="活动描述">
            <Input.TextArea />
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="primary"
            style={{ marginLeft: 10, marginRight: 10 }}
            onClick={async () => {
              const formValue = myForm.getFieldsValue(true);
              const res = await publishApplication({ data: { ...formValue } });
              console.log(res);
              if (res.code === 1) {
                message.success('提交成功!');
              } else {
                message.error('提交失败, 请重试!');
              }
            }}
          >
            提交
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Publish;
