import PageContainer from '../../components/PageContainer';
import { Button, Tabs, Form, Empty, Card } from 'antd';
import { useState, useEffect } from 'react';

import styles from './index.less';
import Activity, { ActivityProps } from '@/components/Activity';
import { getAllActivities, getFilteredActivities } from '@/services/activity';
import ActivityDetailDrawer from '@/components/Activity/detailDrawer';
import EasyCreateModal from '@/components/Activity/easyCreateModal';

const Playground = () => {
  // List
  const [dataSource, setDataSource] = useState<ActivityProps[]>([]);

  // Tab
  const [activeKey, setActiveKey] = useState('0');

  // Drawer
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentActivityId, setCurrentActivityId] = useState<string>('');

  // Modal
  const [easyCreateModalVisible, setEasyCreateModalVisible] = useState<boolean>(false);

  // Form
  const [ActivityDetailFormInstance] = Form.useForm<ActivityProps>();

  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchAllActivities = async () => {
    setRefresh(true);
    const res = await getAllActivities();
    setDataSource(res.data);
    setRefresh(false);
  };

  const fetchFilteredActivities = async (key: string) => {
    setRefresh(true);
    if (key === '0') fetchAllActivities();
    else {
      const res = await getFilteredActivities({ key: parseInt(key) });
      setDataSource(res.data);
    }
    setRefresh(false);
  };

  useEffect(() => {
    fetchAllActivities();
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchFilteredActivities(activeKey);
    }
  }, [refresh]);

  return (
    <PageContainer>
      <div className={styles.content}>
        <div className={styles.header}>
          <Button
            type="primary"
            onClick={() => {
              setEasyCreateModalVisible(true);
            }}
          >
            快速创建
          </Button>
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
              fetchFilteredActivities(key);
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
          {dataSource.length > 0 ? (
            dataSource.map((item: ActivityProps, id: number) => {
              return (
                <Activity
                  key={id}
                  detail={item}
                  setDrawerVisible={setDrawerVisible}
                  ActivityDetailFormInstance={ActivityDetailFormInstance}
                  refreshList={() => {
                    setRefresh(true);
                  }}
                  setCurrentActivityId={setCurrentActivityId}
                ></Activity>
              );
            })
          ) : (
            <Card>
              <Empty description="暂无活动">
                <Button
                  type="primary"
                  onClick={() => {
                    setEasyCreateModalVisible(true);
                  }}
                >
                  点击发布
                </Button>
              </Empty>
            </Card>
          )}
        </div>
      </div>
      <ActivityDetailDrawer
        activity_id={currentActivityId}
        visible={drawerVisible}
        setVisible={setDrawerVisible}
        ActivityDetailFormInstance={ActivityDetailFormInstance}
        editable={false}
      />
      <EasyCreateModal visible={easyCreateModalVisible} setVisible={setEasyCreateModalVisible} />
    </PageContainer>
  );
};

export default Playground;
