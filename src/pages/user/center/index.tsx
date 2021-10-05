import react from 'react';
import { Avatar, Button, Card, Form } from 'antd';
import { useStore } from '../../../models';
import background from '../../../../public/background.jpg';
import styles from './index.less';
import { CalendarOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';

const Center = () => {
  const [sharedState, setSharedState] = useStore('Shared');
  return (
    <div className={styles.content}>
      <Card style={{ width: '80%' }}>
        <div className={styles.header}>
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
        </div>
        <div className={styles.main}></div>
      </Card>
    </div>
  );
};

export default Center;
