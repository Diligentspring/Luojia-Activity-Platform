import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Tabs, Tag, Typography } from 'antd';
import React, { useState } from 'react';

import styles from './index.less';

enum StatusType {
  NOT_START = 1,
  APPLYING = 2,
  RUNNING = 3,
  FINISHED = 4,
}
interface ActivityProps {
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

const { Title } = Typography;

const Status = (props: any) => {
  const { value } = props;
  switch (value) {
    case StatusType.NOT_START:
      return (
        <Tag color="default" style={{ marginRight: 0 }}>
          尚未开始
        </Tag>
      );
    case StatusType.APPLYING:
      return (
        <Tag color="warning" style={{ marginRight: 0 }}>
          火热报名中
        </Tag>
      );
    case StatusType.RUNNING:
      return (
        <Tag color="processing" style={{ marginRight: 0 }}>
          正在进行中
        </Tag>
      );
    case StatusType.FINISHED:
      return (
        <Tag color="magenta" style={{ marginRight: 0 }}>
          已结束
        </Tag>
      );
    default:
      return (
        <Tag color="default" style={{ marginRight: 0 }}>
          其他
        </Tag>
      );
  }
};

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
    <div className={styles.main}>
      <Card style={{ width: '70%' }}>
        <div className={styles.content}>
          <div className={styles.left_div}>
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
          <div className={styles.right_div}>
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
            <div>
              <Button>我要参加</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
const Playground = () => {
  const initialDataSource = [
    {
      id: 1,
      title: '活动1',
      desc: '这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 100,
      dislikes: 0,
      status: 4,
    },
    {
      id: 2,
      title: '活动2',
      desc: '这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 200,
      dislikes: 0,
      status: 1,
    },
    {
      id: 3,
      title: '活动3',
      desc: '这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 300,
      dislikes: 0,
      status: 3,
    },
    {
      id: 4,
      title: '活动4',
      desc: '这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 400,
      dislikes: 0,
      status: 2,
    },
    {
      id: 5,
      title: '活动5',
      desc: '这是活动5这是活动5这是活动5这是活动5这是活动5这是活动5',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 500,
      dislikes: 0,
      status: 1,
    },
    {
      id: 6,
      title: '活动6',
      desc: '这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 600,
      dislikes: 0,
      status: 3,
    },
    {
      id: 7,
      title: '活动7',
      desc: '这是活动7这是活动7这是活动7',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 700,
      dislikes: 0,
      status: 4,
    },
    {
      id: 8,
      title: '活动8',
      desc: '这是活动8这是活动8这是活动8这是活动8',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 800,
      dislikes: 0,
      status: 3,
    },
    {
      id: 9,
      title: '活动9',
      desc: '这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 900,
      dislikes: 0,
      status: 2,
    },
    {
      id: 10,
      title: '活动10',
      desc: '这是活动10这是活动10这是活动10这是活动10这是活动10',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 1000,
      dislikes: 0,
      status: 1,
    },
    {
      id: 11,
      title: '活动11',
      desc: '这是活动11这是活动11这是活动11这是活动11这是活动11这是活动11这是活动11',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 1100,
      dislikes: 0,
      status: 4,
    },
  ];
  const [dataSource, setDataSource] = useState<ActivityProps[]>(initialDataSource);

  const [activeKey, setActiveKey] = useState('0');
  return (
    <PageContainer>
      <div
        style={{
          width: '85%',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 20,
        }}
      >
        <Button type="primary">快速创建</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ marginLeft: '15%' }}>
          <Tabs
            defaultActiveKey={activeKey}
            onChange={(key) => {
              setActiveKey(key);
              if (key === '0') setDataSource(initialDataSource);
              else
                setDataSource(
                  initialDataSource.filter((item: ActivityProps, id: number) => {
                    if (item.status?.toString() === key) {
                      return true;
                    } else {
                      return false;
                    }
                  }),
                );
            }}
          >
            <Tabs.TabPane tab="全部" key="0"></Tabs.TabPane>
            <Tabs.TabPane tab="尚未开始" key="1"></Tabs.TabPane>
            <Tabs.TabPane tab="火热报名中" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="正在进行中" key="3"></Tabs.TabPane>
            <Tabs.TabPane tab="已结束" key="4"></Tabs.TabPane>
          </Tabs>
        </div>
      </div>

      {dataSource.map((item: ActivityProps, id: number) => {
        return <Activity key={id} {...item}></Activity>;
      })}
    </PageContainer>
  );
};

export default Playground;
