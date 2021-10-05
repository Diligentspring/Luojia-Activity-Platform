import react from 'react';
import { StatusType } from './status';
import { Button, Card, Typography } from 'antd';
import Status from './status';

import styles from './index.less';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

const { Title } = Typography;

export interface ActivityProps {
  id: number;
  title?: string; // 活动标题
  desc?: string; // 活动描述
  organizer?: string; // 组织者
  creatTime?: string; // 创建时间
  duration?: string; // 持续时间
  location?: string; // 活动地点
  status?: StatusType; // 活动状态
  participantsNeeded?: number; // 招募人数
  participantsAlready?: number; // 已有人数
  cutOffTime?: number; // 截止时间
  likes?: number; // 点赞数
  dislikes?: number; // 点踩数
}

const Activity = (props: ActivityProps) => {
  const {
    id,
    title,
    desc,
    organizer,
    creatTime,
    duration,
    location,
    status,
    participantsNeeded,
    participantsAlready,
    cutOffTime,
    likes,
    dislikes,
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

            <div style={{ color: 'gray' }}>{desc}</div>
          </div>
          <div className={styles.activity_right_div}>
            <div>{organizer}</div>
            <div>{creatTime}</div>
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
              <Button>我要参加</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Activity;
