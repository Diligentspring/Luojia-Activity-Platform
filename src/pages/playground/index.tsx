import PageContainer from '../../components/PageContainer';
import { Button, Card, Tabs, Tag, Typography, Form } from 'antd';
import React, { useState, useEffect } from 'react';

import styles from './index.less';
import Activity, { ActivityProps } from '@/components/Activity';
import { getAllActivities, getFilteredActivities } from '@/services/playground';
import ActivityDetailDrawer from '@/components/Activity/detailDrawer';

const Playground = () => {
  // List
  const [dataSource, setDataSource] = useState<ActivityProps[]>([]);

  // Tab
  const [activeKey, setActiveKey] = useState('0');

  // Drawer
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  // Form
  const [ActivityDetailFormInstance] = Form.useForm<ActivityProps>();

  const fetchAllActivities = async () => {
    const res = await getAllActivities();
    setDataSource(res.data);
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '10px 20px 0px 20px',
            marginBottom: 10,
            background: 'white',
          }}
        >
          <Tabs
            defaultActiveKey={activeKey}
            onChange={async (key) => {
              setActiveKey(key);
              if (key === '0') fetchAllActivities();
              else {
                const res = await getFilteredActivities({ key: parseInt(key) });
                setDataSource(res.data);
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
            return (
              <Activity
                key={id}
                detail={item}
                setDrawerVisible={setDrawerVisible}
                ActivityDetailFormInstance={ActivityDetailFormInstance}
              ></Activity>
            );
          })}
        </div>
      </div>
      <ActivityDetailDrawer
        visible={drawerVisible}
        setVisible={setDrawerVisible}
        ActivityDetailFormInstance={ActivityDetailFormInstance}
      />
    </PageContainer>
  );
};

export default Playground;
