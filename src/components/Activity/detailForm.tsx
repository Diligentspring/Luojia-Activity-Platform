import { useEffect } from '@umijs/renderer-react/node_modules/@types/react';
import { Col, DatePicker, Form, FormInstance, Input, InputNumber, Row } from 'antd';
import moment from 'moment';
import { ActivityProps } from '.';
interface ActivityDetailFormProps {
  form: FormInstance<ActivityProps>;
  editable: boolean;
}
const ActivityDetailForm = (props: ActivityDetailFormProps) => {
  const { form, editable } = props;

  return (
    <Form form={form}>
      <Form.Item name="title" label="活动名称">
        <Input disabled={!editable}></Input>
      </Form.Item>
      <Row gutter={64}>
        <Col>
          <Form.Item
            name="time_start"
            label="活动开始时间"
            initialValue={moment(form.getFieldValue('time_start'))}
          >
            <DatePicker showTime={true} disabled={!editable} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="time_end" label="活动结束时间">
            <DatePicker showTime={true} disabled={!editable}></DatePicker>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={64}>
        <Col>
          <Form.Item name="start" label="报名开始时间">
            <DatePicker showTime={true} disabled={!editable}></DatePicker>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="deadline" label="报名结束时间">
            <DatePicker showTime={true} disabled={!editable}></DatePicker>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={185} style={{ width: '100%' }}>
        <Col>
          <Form.Item name="number_people" label="招募人数">
            <InputNumber disabled={!editable} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="site" label="活动地点">
        <Input disabled={!editable} />
      </Form.Item>
      <Form.Item name="introduction" label="活动描述">
        <Input.TextArea disabled={!editable} />
      </Form.Item>
    </Form>
  );
};

export default ActivityDetailForm;
