import PageContainer from '../../components/PageContainer';
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, message } from 'antd';
import { publishApplication } from '@/services/publish';
import Activity, { ActivityProps } from '@/components/Activity';
import React, { useState, useEffect } from 'react';

const Publish = () => {
  const [publishForm] = Form.useForm<ActivityProps>();

  return (
    <PageContainer>
      <Card style={{ padding: 20, width: '80%' }}>
        <Form form={publishForm}>
          <Form.Item name="title" label="活动名称" required>
            <Input></Input>
          </Form.Item>
          <Row gutter={64}>
            <Col>
              <Form.Item label="活动开始时间" name="time_start" required>
                <DatePicker showTime={true} format={'YYYY-MM-DD hh:mm:ss'}></DatePicker>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="time_end" label="活动结束时间" required>
                <DatePicker showTime={true}></DatePicker>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={64}>
            <Col>
              <Form.Item name="start" label="报名开始时间" required>
                <DatePicker showTime={true}></DatePicker>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="deadline" label="报名结束时间" required>
                <DatePicker showTime={true}></DatePicker>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={185} style={{ width: '100%' }}>
            <Col>
              <Form.Item name="number_people" label="招募人数" required>
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="site" label="活动地点" required>
            <Input required />
          </Form.Item>
          <Form.Item name="introduction" label="活动描述">
            <Input.TextArea />
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="primary"
            style={{ marginLeft: 10, marginRight: 10 }}
            onClick={async () => {
              const formValue = publishForm.getFieldsValue(true);

              const res = await publishApplication({
                data: {
                  ...formValue,
                  time_start: formValue['time_start']?.format?.('YYYY-MM-DD HH:mm:ss'),
                  time_end: formValue['time_end']?.format?.('YYYY-MM-DD HH:mm:ss'),
                  start: formValue['start']?.format?.('YYYY-MM-DD HH:mm:ss'),
                  deadline: formValue['deadline']?.format?.('YYYY-MM-DD HH:mm:ss'),
                },
              });
              if (res.code === 1) {
                message.success('活动发布成功!');
              } else {
                message.error('活动发布失败, 请重试!');
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
