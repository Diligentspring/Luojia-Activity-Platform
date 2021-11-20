import { cancelActivity } from '@/services/activity';
import { Button, Drawer, FormInstance, message, Popconfirm } from 'antd';
import { ActivityProps } from '.';
import ActivityDetailForm from './detailForm';

interface DrawerProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activity_id: string;
  ActivityDetailFormInstance: FormInstance<ActivityProps>;
  editable: boolean;
}

const ActivityDetailDrawer = (props: DrawerProps) => {
  const { visible, setVisible, ActivityDetailFormInstance, editable = false, activity_id } = props;

  const deleteActivity = async () => {
    const res = await cancelActivity(activity_id);
    if (res?.code === 1) {
      message.success('活动删除成功!');
      setVisible(false);
    } else {
      message.error('活动删除失败, 请重试!');
    }
  };

  return (
    <Drawer
      title="活动详情"
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      extra={
        <Popconfirm
          placement="bottomLeft"
          title={
            <>
              <div>确认要删除此活动吗?</div>
              <div>活动一旦删除, 不可再恢复!</div>
            </>
          }
          onConfirm={async () => {
            await deleteActivity();
          }}
        >
          <Button>删除活动</Button>
        </Popconfirm>
      }
      width="40vw"
      footer={
        <div>
          <Button
            type="primary"
            onClick={() => {
              setVisible(false);
            }}
          >
            确定
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => {
              setVisible(false);
            }}
          >
            取消
          </Button>
        </div>
      }
    >
      <ActivityDetailForm form={ActivityDetailFormInstance} editable={editable} />
    </Drawer>
  );
};

export default ActivityDetailDrawer;
