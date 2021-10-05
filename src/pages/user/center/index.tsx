import react, { useState } from 'react';
import { Avatar, Button, Card, Form, Tabs } from 'antd';
import { useStore } from '../../../models';
import background from '../../../../public/background.jpg';
import styles from './index.less';
import { CalendarOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import Activity, { ActivityProps } from '@/components/Activity';

const Center = () => {
  const [sharedState, setSharedState] = useStore('Shared');

  // Tabs
  const [activeKey, setActiveKey] = useState('0');

  // Activities List
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

  return (
    <PageContainer>
      <div className={styles.content}>
        <Card className={styles.header}>
          <img alt="backPic" src={background} style={{ width: '100%', height: 300 }} />
          <div className={styles.headerContent}>
            <Avatar
              src={sharedState?.user?.avatar}
              shape="square"
              size="large"
              className={styles.avatar}
            ></Avatar>
            <div className={styles.briefInfoDiv}>
              <div className={styles.userName}>{sharedState?.user?.name}</div>
              <div className={styles.otherInfo}>
                <div>
                  <MailOutlined /> {sharedState?.user?.email}
                </div>
                <div>
                  <MobileOutlined /> {sharedState?.user?.phone}
                </div>
                <div>
                  <CalendarOutlined /> {sharedState?.user?.birthday || '2000-01-01'}
                </div>
              </div>
            </div>
            <div className={styles.editButton}>
              <Button type="default">编辑个人资料</Button>
            </div>
          </div>
        </Card>
        <Card className={styles.main}>
          <div>
            <Tabs
              defaultActiveKey={activeKey}
              onChange={(key) => {
                setDataSource([...dataSource.reverse()]);
              }}
            >
              <Tabs.TabPane tab="我发布的" key="0"></Tabs.TabPane>
              <Tabs.TabPane tab="我参与的" key="1"></Tabs.TabPane>
              <Tabs.TabPane tab="我赞过的" key="2"></Tabs.TabPane>
            </Tabs>
          </div>

          <div style={{ width: '100%' }}>
            {dataSource.map((item: ActivityProps, id: number) => {
              return <Activity key={id} {...item}></Activity>;
            })}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Center;
