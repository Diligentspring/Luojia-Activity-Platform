import React from 'react';
import { Col, DatePicker, Form, Input, message, Modal, Row } from 'antd';
import moment from 'moment';
import { ActivityProps } from '@/services/publish/data';
import { publishApplication } from '@/services/publish';

const EasyCreateModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const disabledDate = (current: any) => {
    return current && current < moment().endOf('day');
  };

  const [easyCreateForm] = Form.useForm<ActivityProps>();
  return (
    <Modal
      title={
        <>
          <strong>快速创建你的活动</strong>
          <div style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>
            可稍后在个人中心补充详细信息
          </div>
        </>
      }
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={async () => {
        const formValue = easyCreateForm.getFieldsValue(true);

        // 校验必填项
        await easyCreateForm.validateFields(['title', 'time_start', 'start']);
        // 校验时间顺序
        if (formValue['start'].unix() < formValue['time_start'].unix()) {
          const res = await publishApplication({
            data: {
              ...formValue,
              time_start: formValue['time_start']?.format?.('YYYY-MM-DD HH:mm:ss'),
              start: formValue['start']?.format?.('YYYY-MM-DD HH:mm:ss'),
            },
          });
          if (res.code === 1) {
            message.success('活动发布成功!');
          } else {
            message.error('活动发布失败, 请重试!');
          }
        } else {
          message.error('活动时间顺序有误, 请重试!');
        }

        setVisible(false);
      }}
    >
      <Form form={easyCreateForm}>
        <Form.Item name="title" label="活动名称" required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="活动开始时间" name="time_start" required rules={[{ required: true }]}>
          <DatePicker showTime={true} format={'YYYY-MM-DD hh:mm:ss'} disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item name="start" label="报名开始时间" required rules={[{ required: true }]}>
          <DatePicker showTime={true} disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item name="introduction" label="活动描述">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EasyCreateModal;
