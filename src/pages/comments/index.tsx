import { Button, Input, Typography } from 'antd';
import react, { useState } from 'react';

import styles from './index.less';

interface CommentItemProps {
  id: number;
  username: string;
  actid: number;
  content: string;
  time: string;
}

const CommentItem = ({ detail }: { detail: CommentItemProps }) => {
  return <div></div>;
};

const Comments = () => {
  const [commentsList, setCommentsList] = useState<CommentItemProps[]>();

  console.log(111);
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}></div>
      <div className={styles.main}>
        {commentsList?.map((item) => {
          return <CommentItem detail={item} />;
        })}
      </div>
      <div className={styles.bottom}>
        <Typography.Title title="发表评论" />
        <Input.TextArea></Input.TextArea>
        <Button>发表</Button>
      </div>
    </div>
  );
};

export default Comments;
