import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tag, Typography } from 'antd';
import React, { useState } from 'react';

import styles from './index.less';

enum StatusType {
  NOT_START = 0,
  APPLYING = 1,
  RUNNING = 2,
  FINISHED = 3,
}
interface ActivityProps {
  id: number;
  title?: string; // 活动标题
  desc?: string; // 活动描述
  organizer?: string; // 组织者
  creatTime?: string; // 创建时间
  duration?: string; // 持续时间
  location?:string;  // 活动地点
  status?: StatusType; // 活动状态
  participantsNeeded?: number; // 招募人数
  participantsAlready?: number; // 已有人数
  cutOffTime?: number; // 截止时间
  likes?: number; // 点赞数
  dislikes?: number; // 点踩数
}

const { Title } = Typography;

const Status = (props: any) => {
  const { value } = props;
  switch (value) {
    case StatusType.NOT_START:
      return <Tag color="default">尚未开始</Tag>;
    case StatusType.APPLYING:
      return <Tag color="warning">火热报名中</Tag>;
    case StatusType.RUNNING:
      return <Tag color="processing">正在进行中</Tag>;
    case StatusType.FINISHED:
      return <Tag color="magenta">已结束</Tag>;
    default:
      return <Tag color="default">其他</Tag>;
  }
};

const Activity = (props: ActivityProps) => {
  const {
    id,
    title,
    desc,
    organizer,
    creatTime,
    duration,location,
    status,
    participantsNeeded,
    participantsAlready,
    cutOffTime,
    likes,
    dislikes,
  } = props;
  return (
    <div className={styles.main}>
      <Card>
        <div className={styles.content}>
          <div className={styles.left_div}>
            <Title level={2}>{title}</Title>
            <div style={{ color: 'gray' }}>{desc}</div>
          </div>
          <div className={styles.right_div}>
            <div>
              <Status value={status} />
            </div>
            <div>{organizer}</div>
            <div>{creatTime}</div>
            <div className={styles.like_div}>
              <div>
                <LikeOutlined />
                {likes}
              </div>
              <div style={{ marginLeft: 2 }}>
                <DislikeOutlined />
                {dislikes}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
const Playground = () => {
  const [dataSource, setDataSource] = useState<ActivityProps[]>([
    {
      id: 1,
      title: '活动1',
      desc: '这是活动1',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 100,
      dislikes: 0,
      status: 0,
    },
    {
      id: 2,
      title: '活动2',
      desc: '这是活动2',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 200,
      dislikes: 0,
      status: 1,
    },
    {
      id: 3,
      title: '活动3',
      desc: '这是活动3',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 300,
      dislikes: 0,
      status: 3,
    },
  ]);

  return (
    <PageContainer>
      {dataSource.map((item: ActivityProps, id: number) => {
        return <Activity key={id} {...item}></Activity>;
      })}
    </PageContainer>
  );
};

export default Playground;
