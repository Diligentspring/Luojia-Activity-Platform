import { useState, useEffect } from 'react';
import { Button, Empty, message, Tabs } from 'antd';
import Activity, { ActivityProps } from '@/components/Activity';
import { getActivitiesParticipated, getActivitiesPublishedByMyself } from '@/services/user';
import EasyCreateModal from '@/components/Activity/easyCreateModal';

const CenterCard = () => {
  // Tabs
  const [activeKey, setActiveKey] = useState('0');

  // List
  const [dataSource, setDataSource] = useState<ActivityProps[]>();

  // Modal
  const [easyCreateModalVisible, setEasyCreateModalVisible] = useState<boolean>(false);

  // 获取我发布的活动
  const fetchPublished = async () => {
    const res = await getActivitiesPublishedByMyself();
    setDataSource(res?.data);
  };

  // 获取我发布的活动
  const fetchParticipated = async () => {
    const res = await getActivitiesParticipated();
    setDataSource(res?.data);
  };

  useEffect(() => {
    fetchPublished();
  }, []);
  return (
    <>
      <Tabs
        defaultActiveKey={activeKey}
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
      <div style={{ width: '100%', height: '30vh', overflow: 'auto' }}>
        {dataSource && dataSource.length > 0 ? (
          dataSource?.map((item: ActivityProps, id: number) => {
            return <Activity key={id} detail={item}></Activity>;
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
      <EasyCreateModal visible={easyCreateModalVisible} setVisible={setEasyCreateModalVisible} />
    </>
  );
};

export default CenterCard;
