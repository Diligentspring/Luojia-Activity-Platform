import { useState } from 'react';
import { Upload, Button, Card, Image } from 'antd';
import background from '../../../../public/background.jpg';
import avat from '../../../../public/avatar.png';
import styles from './index.less';
import { UploadOutlined, CalendarOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import CenterCard from './components/CenterCard';
import InfoEditCard from './components/InfoEditCard';
import { useModel } from 'umi';

const Center = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  console.log(initialState?.currentUser?.avatar);

  return (
    <PageContainer>
      <div className={styles.content}>
        <Card className={styles.header}>
          <img alt="backPic" src={background} style={{ width: '100%', height: 300 }} />
          <div className={styles.headerContent}>
            <div className={styles.avatar}>
              <Image
                src={'/api' + initialState?.currentUser?.avatar}
                fallback={avat}
                width={160}
                height={160}
              />
              <div className={styles.button_view}>
                <Upload
                  showUploadList={false}
                  action="/api/uploadavatar"
                  onChange={(info: any) => {
                    if (info.file.status === 'done') {
                      setInitialState({
                        ...initialState,
                        currentUser: {
                          ...initialState?.currentUser,
                          avatar: info.file.response.imgUrl,
                        },
                      });
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />}>更换头像</Button>
                </Upload>
              </div>
            </div>

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
