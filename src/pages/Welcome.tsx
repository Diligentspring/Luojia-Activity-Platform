import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { Card, Alert, Typography, Divider, Statistic, Row, Col } from 'antd';
import { PieChartOutlined, UserOutlined, SlackOutlined } from '@ant-design/icons';

import styles from './Welcome.less';

const { Title } = Typography;

export default (): React.ReactNode => {
  const [state, setState] = useState({
    totalActivities: 1372,
    runningActivities: 269,
    totalUser: 7493,
  });

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
                value={state.totalActivities}
                prefix={<SlackOutlined />}
              ></Statistic>
            </Card>
          </Col>
          <Col>
            <Card>
              <Statistic
                title="用户总数"
                prefix={<UserOutlined />}
                value={state.totalUser}
              ></Statistic>
            </Card>
          </Col>
          <Col>
            <Card>
              <Statistic
                title="正在进行中"
                prefix={<PieChartOutlined />}
                value={state.runningActivities}
                suffix={`/${state.totalActivities}`}
              ></Statistic>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};
