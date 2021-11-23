import { cancelActivity, updateActivity } from '@/services/activity';
import { Button, Drawer, FormInstance, message, Popconfirm } from 'antd';
import { ActivityProps } from '.';
import ActivityDetailForm from './detailForm';

interface DrawerProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activity_id: string;
  ActivityDetailFormInstance: FormInstance<ActivityProps>;
  editable: boolean;
  refreshList?: () => void;
}

const ActivityDetailDrawer = (props: DrawerProps) => {
  const {
    visible,
    setVisible,
    ActivityDetailFormInstance,
    editable = false,
    activity_id,
    refreshList,
  } = props;

  const deleteActivity = async () => {
    const res = await cancelActivity(activity_id);
    if (res?.code === 1) {
      message.success('活动删除成功!');
      setVisible(false);
      refreshList?.();
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
        editable && (
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
        )
      }
      width="40vw"
      footer={
        <div>
          <Button
            type="primary"
            onClick={async () => {
              const formValue = ActivityDetailFormInstance.getFieldsValue(true);
              try {
                // 校验必填项
                await ActivityDetailFormInstance.validateFields([
                  'title',
                  'time_start',
                  'time_end',
                  'site',
                  'number_people',
                  'deadline',
                  'start',
                ]);

                if (
                  formValue['start'].unix() < formValue['deadline'].unix() &&
                  formValue['deadline'].unix() < formValue['time_start'].unix() &&
                  formValue['time_start'].unix() < formValue['time_end'].unix()
                ) {
                  const res = await updateActivity({
                    id: activity_id,
                    title: formValue.title,
                    site: formValue.site,
                    number_people: formValue.number_people,
                    introduction: formValue.introduction,
                    time_start: formValue['time_start']?.format?.('YYYY-MM-DD HH:mm:ss'),
                    time_end: formValue['time_end']?.format?.('YYYY-MM-DD HH:mm:ss'),
                    start: formValue['start']?.format?.('YYYY-MM-DD HH:mm:ss'),
                    deadline: formValue['deadline']?.format?.('YYYY-MM-DD HH:mm:ss'),
                  });
                  if (res?.code === 1) {
                    message.success('修改成功!');
                    refreshList?.();
                  } else {
                    message.error('修改失败, 请重试!');
                  }
                } else {
                  message.error('活动时间顺序有误, 请重试!');
                }
              } catch (e: any) {
                message.error(e.toString());
              }
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
