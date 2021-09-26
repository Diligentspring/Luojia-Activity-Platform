import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Divider, Statistic } from 'antd';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';

import styles from './Welcome.less';
import { useState } from '@umijs/renderer-react/node_modules/@types/react';

const { Title } = Typography;

export default (): React.ReactNode => {
  const [state, setState] = useState({
    totalActivities: 1372,
    runningActivities: 269,
    totalUser: 7493,
  });

  return (
    <PageContainer pageHeaderRender={false}>
      <Card>
        <div className={styles.title_div}>
          <Title level={1} style={{ margin: 0 }}>
            活动管理平台
          </Title>
          <Divider type="vertical"></Divider>
          <Title level={2} style={{ margin: '0 5' }}>
            平台总览
          </Title>
        </div>
        <div>
          <Statistic title="活动总数" value={state.totalActivities}></Statistic>
          <Statistic title="用户总数" prefix={<UserOutlined />} value={state.totalUser}></Statistic>
          <Statistic
            title="正在进行中"
            prefix={<PieChartOutlined />}
            value={state.runningActivities}
            suffix={`/${state.totalActivities}`}
          ></Statistic>
        </div>
      </Card>
    </PageContainer>
  );
};
