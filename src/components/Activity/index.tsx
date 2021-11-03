import react from 'react';
import { StatusType } from './status';
import { Button, Card, message, Typography } from 'antd';
import Status from './status';

import styles from './index.less';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { activityApply, cancelApplication } from '@/services/playground';

const { Title } = Typography;

export interface ActivityProps {
  id: string;
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
  likes?: number; // 点赞数
  dislikes?: number; // 点踩数
  participated?: boolean; // 是否已参加
}

const Activity = (props: ActivityProps) => {
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
    likes,
    dislikes,
    participated,
  } = props;

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
            <div>{organizer}</div>
            <div>{time_start}</div>
            <div className={styles.activity_like_div}>
              <div>
                <LikeOutlined />
                {likes}
              </div>
              <div style={{ marginLeft: 2 }}>
                <DislikeOutlined />
                {dislikes}
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
