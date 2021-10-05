import react from 'react';

import styles from './index.less';
const PageContainer = (props: any) => {
  return <div className={styles.background}>{props.children}</div>;
};

export default PageContainer;
