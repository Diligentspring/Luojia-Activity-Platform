import react from 'react';
import { StatusType } from './status';
import { Button, Card, message, Typography, Form, FormInstance } from 'antd';
import Status from './status';

import styles from './index.less';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import {
  activityApply,
  cancelApplication,
  cancelhate,
  cancelLike,
  hateThisActivity,
  likeThisActivity,
} from '@/services/playground';

const { Title } = Typography;

export interface ActivityProps {
  id: string; // 活动id
  title?: string; // 活动标题
  type?: string; // 活动种类
  introduction?: string; // 活动描述
  organizer?: string; // 组织者
  time_start?: string; // 活动创建时间
  time_end?: string; // 活动结束时间
  site?: string; // 活动地点
  status?: StatusType; // 活动状态
  number_people?: number; // 招募人数
  already_register?: number; // 已有人数
  start?: string; // 报名开始时间
  deadline?: string; // 报名截止时间
  like?: number; // 点赞数
  like_this?: boolean; // 当前用户是否已对当前活动点赞
  hate?: number; // 点踩数
  hate_this?: boolean; // 当前用户是否已对当前活动点踩
  participated?: boolean; // 是否已参加
}

interface ActivityItemProps {
  key: number;
  detail: ActivityProps;
  setDrawerVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  ActivityDetailFormInstance?: FormInstance<ActivityProps>;
}

const Activity = (props: ActivityItemProps) => {
  const { detail, setDrawerVisible, ActivityDetailFormInstance: form } = props;
  const {
    id,
    title,
    introduction,
    organizer,
    time_start,
    time_end,
    site,
    status,
    number_people,
    already_register,
    start,
    deadline,
    like,
    like_this,
    hate,
    hate_this,
    participated,
  } = detail;

  return (
    <div className={styles.activity_main}>
      <Card style={{ width: '100%' }}>
        <div className={styles.activity_content}>
          <div className={styles.activity_left_div}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Title level={2} style={{ marginBottom: 0 }}>
                {title}
              </Title>
              <div style={{ marginLeft: 10 }}>
                <Status value={status} />
              </div>
            </div>

            <div style={{ color: 'gray' }}>{introduction}</div>
          </div>
          <div className={styles.activity_right_div}>
            <div>
              <Button
                type="link"
                onClick={() => {
                  form && form.setFieldsValue({ ...detail });
                  setDrawerVisible && setDrawerVisible(true);
                }}
              >
                查看详情
              </Button>
            </div>
            <div>{organizer}</div>
            <div>{time_start}</div>
            <div className={styles.activity_like_div}>
              <div
                style={{ cursor: 'pointer' }}
                onClick={async () => {
                  const res = await (like_this
                    ? cancelLike({ activity_ID: id })
                    : likeThisActivity({ activity_ID: id }));
                  if (res?.code === 1) {
                    message.success(`${like_this ? '已取消赞!' : '已点赞!'}`);
                  } else {
                    message.error('操作失败, 请重试!');
                  }
                }}
              >
                {like_this ? <LikeFilled /> : <LikeOutlined />}
                {like}
              </div>
              <div
                style={{ marginLeft: 10, cursor: 'pointer' }}
                onClick={async () => {
                  const res = await (hate_this
                    ? cancelhate({ activity_ID: id })
                    : hateThisActivity({ activity_ID: id }));
                  if (res?.code === 1) {
                    message.success(`${hate_this ? '已取消踩!' : '已踩!'}`);
                  } else {
                    message.error('操作失败, 请重试!');
                  }
                }}
              >
                {hate_this ? <DislikeFilled /> : <DislikeOutlined />}
                {hate}
              </div>
            </div>
            <div>
              {!participated ? (
                <Button
                  onClick={async () => {
                    const res = await activityApply({ activity_ID: id });
                    if (res?.code === 1) {
                      message.success('报名成功!');
                    } else {
                      message.error('报名失败, 请重试!');
                    }
                  }}
                >
                  我要参加
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    const res = await cancelApplication({ activity_ID: id });
                    if (res?.code === 1) {
                      message.success('取消报名成功!');
                    } else {
                      message.error('取消报名失败, 请重试!');
                    }
                  }}
                >
                  取消报名
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Activity;
