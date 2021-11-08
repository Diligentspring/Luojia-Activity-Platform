import react, { useState } from 'react';
import { Avatar, Button, Card, Form, Tabs } from 'antd';
import background from '../../../../public/background.jpg';
import styles from './index.less';
import { CalendarOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import Activity, { ActivityProps } from '@/components/Activity';
import CenterCard from './components/CenterCard';
import InfoEditCard from './components/InfoEditCard';
import { useModel } from 'umi';

const Center = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <PageContainer>
      <div className={styles.content}>
        <Card className={styles.header}>
          <img alt="backPic" src={background} style={{ width: '100%', height: 300 }} />
          <div className={styles.headerContent}>
            <Avatar
              src={initialState?.currentUser?.avatar}
              shape="square"
              size="large"
              className={styles.avatar}
            ></Avatar>
            <div className={styles.briefInfoDiv}>
              <div className={styles.userName}>{initialState?.currentUser?.username}</div>
              <div className={styles.otherInfo}>
                <div>
                  <MailOutlined /> {initialState?.currentUser?.email}
                </div>
                <div>
                  <MobileOutlined /> {initialState?.currentUser?.phone}
                </div>
                <div>
                  <CalendarOutlined /> {initialState?.currentUser?.birth_date || '2000-01-01'}
                </div>
              </div>
            </div>
            <div className={styles.editButton}>
              <Button
                type="default"
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                {!isEditing ? '编辑个人资料' : '返回个人中心'}
              </Button>
            </div>
          </div>
        </Card>
        <Card className={styles.main}>{!isEditing ? <CenterCard /> : <InfoEditCard />}</Card>
      </div>
    </PageContainer>
  );
};

export default Center;
