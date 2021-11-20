import { useState, useEffect } from 'react';
import { Button, Empty, Form, message, Tabs } from 'antd';
import Activity, { ActivityProps } from '@/components/Activity';
import { getActivitiesParticipated, getActivitiesPublishedByMyself } from '@/services/user';
import EasyCreateModal from '@/components/Activity/easyCreateModal';
import ActivityDetailDrawer from '@/components/Activity/detailDrawer';

const CenterCard = () => {
  // Tabs
  const [activeKey, setActiveKey] = useState('0');

  // List
  const [dataSource, setDataSource] = useState<ActivityProps[]>();

  const [refresh, setRefresh] = useState<boolean>(false);

  // Modal
  const [easyCreateModalVisible, setEasyCreateModalVisible] = useState<boolean>(false);

  // Drawer
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentActivityId, setCurrentActivityId] = useState<string>('');

  // Form
  const [ActivityDetailFormInstance] = Form.useForm<ActivityProps>();

  // 获取我发布的活动
  const fetchPublished = async () => {
    setRefresh(true);
    const res = await getActivitiesPublishedByMyself();
    setDataSource(res?.data);
    setRefresh(false);
  };

  // 获取我发布的活动
  const fetchParticipated = async () => {
    const res = await getActivitiesParticipated();
    setDataSource(res?.data);
  };

  useEffect(() => {
    fetchPublished();
  }, []);

  useEffect(() => {
    if (refresh) {
      activeKey === '0' ? fetchPublished() : fetchParticipated();
    }
  }, [refresh]);

  return (
    <>
      <Tabs
        defaultActiveKey={activeKey}
        tabBarExtraContent={
          <Button
            type="primary"
            onClick={() => {
              setEasyCreateModalVisible(true);
            }}
          >
            发布活动
          </Button>
        }
        onChange={(key) => {
          switch (key) {
            case '0':
              fetchPublished();
              break;
            case '1':
              fetchParticipated();
              break;
            default:
              message.error('获取类型有误, 请重试!');
              break;
          }
          setActiveKey(key);
        }}
      >
        <Tabs.TabPane tab="我发布的" key="0"></Tabs.TabPane>
        <Tabs.TabPane tab="我参与的" key="1"></Tabs.TabPane>
      </Tabs>
      <div style={{ width: '100%' }}>
        {dataSource && dataSource.length > 0 ? (
          dataSource?.map((item: ActivityProps, id: number) => {
            return (
              <Activity
                key={id}
                detail={item}
                ActivityDetailFormInstance={ActivityDetailFormInstance}
                setDrawerVisible={setDrawerVisible}
                setCurrentActivityId={setCurrentActivityId}
                refreshList={() => {
                  setRefresh(true);
                }}
              ></Activity>
            );
          })
        ) : (
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
        )}
      </div>
      <ActivityDetailDrawer
        visible={drawerVisible}
        setVisible={setDrawerVisible}
        ActivityDetailFormInstance={ActivityDetailFormInstance}
        editable={activeKey === '0'}
        activity_id={currentActivityId}
      />
      <EasyCreateModal visible={easyCreateModalVisible} setVisible={setEasyCreateModalVisible} />
    </>
  );
};

export default CenterCard;
