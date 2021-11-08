import { Button, Drawer, FormInstance } from 'antd';
import { ActivityProps } from '.';
import ActivityDetailForm from './detailForm';

interface DrawerProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ActivityDetailFormInstance: FormInstance<ActivityProps>;
}
const ActivityDetailDrawer = (props: DrawerProps) => {
  const { visible, setVisible, ActivityDetailFormInstance } = props;

  return (
    <Drawer
      title="活动详情"
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
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
      <ActivityDetailForm form={ActivityDetailFormInstance} />
    </Drawer>
  );
};

export default ActivityDetailDrawer;
