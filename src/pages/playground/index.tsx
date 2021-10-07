import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import PageContainer from '../../components/PageContainer';
import { Button, Card, Tabs, Tag, Typography } from 'antd';
import React, { useState, useEffect } from 'react';

import styles from './index.less';
import Activity, { ActivityProps } from '@/components/Activity';
import { getAllActivities, getFilteredActivities } from '@/services/playground';

const Playground = () => {
  const [dataSource, setDataSource] = useState<ActivityProps[]>([]);

  const [activeKey, setActiveKey] = useState('0');

  const fetchAllActivities = async () => {
    const res = await getAllActivities();
    setDataSource(res.res);
  };

  useEffect(() => {
    fetchAllActivities();
  }, []);

  return (
    <PageContainer>
      <div className={styles.content}>
        <div className={styles.header}>
          <Button type="primary">快速创建</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Tabs
            defaultActiveKey={activeKey}
            onChange={async (key) => {
              setActiveKey(key);
              if (key === '0') fetchAllActivities();
              else {
                const res = await getFilteredActivities({ key: parseInt(key) });
                setDataSource(res.res);
              }
            }}
          >
            <Tabs.TabPane tab="全部" key="0"></Tabs.TabPane>
            <Tabs.TabPane tab="报名尚未开始" key="1"></Tabs.TabPane>
            <Tabs.TabPane tab="火热报名中" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="活动尚未开始" key="3"></Tabs.TabPane>
            <Tabs.TabPane tab="正在进行中" key="4"></Tabs.TabPane>
            <Tabs.TabPane tab="已结束" key="5"></Tabs.TabPane>
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
