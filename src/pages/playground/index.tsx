import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import PageContainer from '../../components/PageContainer';
import { Button, Card, Tabs, Tag, Typography } from 'antd';
import React, { useState } from 'react';

import styles from './index.less';
import Activity, { ActivityProps } from '@/components/Activity';

const Playground = () => {
  const initialDataSource: ActivityProps[] = [
    {
      id: 1,
      title: '活动1',
      desc: '这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1',
      organizer: '魏瑄',
      creatTime: '2021-09-10',
      likes: 100,
      dislikes: 0,
      status: 4,
      participated: false,
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
      participated: true,
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
      participated: true,
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
      participated: false,
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
      participated: false,
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
      participated: false,
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
      participated: false,
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
      participated: false,
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
      participated: true,
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
      participated: true,
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
      participated: true,
    },
  ];
  const [dataSource, setDataSource] = useState<ActivityProps[]>(initialDataSource);

  const [activeKey, setActiveKey] = useState('0');
  return (
    <PageContainer>
      <div className={styles.content}>
        <div className={styles.header}>
          <Button type="primary">快速创建</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
        <div className={styles.activities_list}>
          {dataSource.map((item: ActivityProps, id: number) => {
            return <Activity key={id} {...item}></Activity>;
          })}
        </div>
      </div>
    </PageContainer>
  );
};

export default Playground;
