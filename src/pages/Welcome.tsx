import React, { useState , useEffect} from 'react';
import PageContainer from '../components/PageContainer';
import { ActsumApplication, usersumApplication, ActprogressApplication } from '@/services/Welcome';
import { Card, Alert, Typography, Divider, Statistic, Row, Col } from 'antd';
import { PieChartOutlined, UserOutlined, SlackOutlined } from '@ant-design/icons';

import styles from './Welcome.less';

const { Title } = Typography;

export default (): React.ReactNode => {
  const [actsum, setactsum] = useState('0')
  const [usersum, setusersum] = useState('0')
  const [actpro, setactpro] = useState('0')
  
  const fetchsumActivities = async () => {
    const res = await ActsumApplication();
    setactsum(String(res));
  };

  const fetchsumuser = async () => {
    const res = await usersumApplication();
    setusersum(String(res));
  };

  const fetchproActivities = async () => {
    const res = await ActprogressApplication();
    setactpro(String(res));
  };

  useEffect(() => {
    fetchsumActivities();
    fetchsumuser();
    fetchproActivities();
  }, []);

  return (
    <PageContainer>
      <div className={styles.content}>
        <div className={styles.title_div}>
          <Title level={1} style={{ margin: 0 }}>
            活动管理平台
          </Title>
          <Divider type="vertical" style={{ height: 50 }}></Divider>
          <Title level={2} style={{ margin: 0, color: 'gray' }}>
            平台总览
          </Title>
        </div>
        <Row gutter={32} className={styles.main}>
          <Col>
            <Card>
              <Statistic
                title="活动总数"
                value={actsum}
                prefix={<SlackOutlined />}
              ></Statistic>
            </Card>
          </Col>
          <Col>
            <Card>
              <Statistic
                title="用户总数"
                prefix={<UserOutlined />}
                value={usersum}
              ></Statistic>
            </Card>
          </Col>
          <Col>
            <Card>
              <Statistic
                title="正在进行中"
                prefix={<PieChartOutlined />}
                value={actpro}
                suffix={`/${actsum}`}
              ></Statistic>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};
