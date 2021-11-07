import react, { useState } from 'react';
import { useStore } from '@/models';
import { Button, Col, DatePicker, Divider, Input, message, Row } from 'antd';
import { UpdateUserInfo } from '@/services/user';
import moment from 'moment';
import { useModel } from 'umi';

interface ItemProps {
  id: string;
  label?: string;
  value?: string;
  // isEditing?: boolean;
}

const InfoItem = (props: ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  const { id, label } = props;

  return (
    <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
      <Col span={4} style={{ fontSize: 18, fontWeight: 'bold' }}>
        {label}
      </Col>
      <Col span={2}>
        <Divider type="vertical" />
      </Col>
      {!isEditing ? (
        <>
          {id === 'password' ? <Col span={4}>******</Col> : <Col span={4}>{value}</Col>}
          <Col span={4}>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => {
                setIsEditing(true);
              }}
            >
              编辑
            </Button>
          </Col>
        </>
      ) : (
        <>
          <Col span={4}>
            {(() => {
              switch (id) {
                case 'password':
                  return (
                    <Input.Password
                      defaultValue={value}
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  );
                case 'birth_date':
                  return (
                    <DatePicker
                      defaultValue={moment(value)}
                      value={moment(value)}
                      onChange={(date, dateString) => {
                        setValue(dateString);
                      }}
                    ></DatePicker>
                  );
                default:
                  return (
                    <Input
                      defaultValue={value}
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  );
              }
            })()}
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              style={{ marginLeft: 10, marginRight: 10 }}
              onClick={async () => {
                const res = await UpdateUserInfo({ [id]: value });
                if (res.code === 1) {
                  message.success('修改成功!');
                  setIsEditing(false);
                } else {
                  message.error('修改失败, 请重试!');
                }
              }}
            >
              保存
            </Button>
            <Button
              type="default"
              onClick={() => {
                setValue(props.value);
                setIsEditing(false);
              }}
            >
              取消
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};

const InfoEditCard = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const Info = [
    { key: 'username', label: '用户名', value: initialState?.currentUser?.username },
    { key: 'email', label: '邮箱', value: initialState?.currentUser?.email },
    { key: 'phone', label: '联系电话', value: initialState?.currentUser?.phone },
    { key: 'password', label: '密码', value: initialState?.currentUser?.password },
    { key: 'birth_date', label: '出生日期', value: initialState?.currentUser?.birth_date },
    { key: 'sex', label: '性别', value: initialState?.currentUser?.sex },
    { key: 'major', label: '专业', value: initialState?.currentUser?.major },
    { key: 'school', label: '学院', value: initialState?.currentUser?.school },
    { key: 'grade', label: '年级', value: initialState?.currentUser?.grade },
  ];

  return (
    <div>
      {Info.map((item: any) => {
        console.log(item);
        return <InfoItem id={item.key} {...item} />;
      })}
    </div>
  );
};

export default InfoEditCard;
