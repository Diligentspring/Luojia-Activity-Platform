import { activityApply, cancelApplication } from '@/services/activity';
import { Avatar, Button, Drawer, Empty, List, message } from 'antd';
import react from 'react';
import { useModel } from 'umi';
import { ActivityProps } from '.';
import { StatusType } from './status';

const ParticipatorDrawer = ({
  activityDetail,
  visible,
  setVisible,
  refreshList,
}: {
  activityDetail: ActivityProps;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
}) => {
  const { initialState } = useModel('@@initialState');
  const { id: activity_id, participator: participators, participated, state } = activityDetail;

  return (
    <Drawer
      title="查看所有参与者"
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      extra={
        !participated &&
        participators &&
        participators?.length > 0 &&
        state === StatusType.APPLYING && (
          <Button
            type="primary"
            onClick={async () => {
              const res = await activityApply({ activity_ID: activity_id });
              if (res?.code === 1) {
                message.success('报名成功!');
                setVisible(false);
                refreshList && refreshList();
              } else {
                message.error('报名失败, 请重试!');
              }
            }}
          >
            我要报名
          </Button>
        )
      }
    >
      {participators && participators?.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={participators}
          renderItem={(item, id) => {
            console.log(item);
            return (
              <List.Item>
                <List.Item.Meta
                  key={id}
                  avatar={<Avatar src={'/api' + item.avatar} />}
                  title={item.username}
                  description={
                    <div>
                      {item.school} {item.major} {item.grade}
                    </div>
                  }
                />
                {state === StatusType.APPLYING && item.id === initialState?.currentUser?.id && (
                  <Button
                    onClick={async () => {
                      const res = await cancelApplication({ activity_ID: activity_id });
                      if (res?.code === 1) {
                        message.success('取消报名成功!');
                        setVisible(false);
                        refreshList && refreshList();
                      } else {
                        message.error('取消报名失败, 请重试!');
                      }
                    }}
                  >
                    取消报名
                  </Button>
                )}
              </List.Item>
            );
          }}
        />
      ) : (
        <Empty description="暂无参与者">
          {state === StatusType.APPLYING && (
            <Button
              type="primary"
              onClick={async () => {
                const res = await activityApply({ activity_ID: activity_id });
                if (res?.code === 1) {
                  message.success('报名成功!');
                  setVisible(false);
                  refreshList && refreshList();
                } else {
                  message.error('报名失败, 请重试!');
                }
              }}
            >
              我要报名
            </Button>
          )}
        </Empty>
      )}
    </Drawer>
  );
};

export default ParticipatorDrawer;
