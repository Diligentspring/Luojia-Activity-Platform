import {
  Avatar,
  Button,
  Card,
  Input,
  message,
  Typography,
  Comment,
  List,
  Row,
  Form,
  Affix,
} from 'antd';
import react, { useState, useMemo, useEffect } from 'react';
import { history, useModel } from 'umi';
import PageContainer from '../../components/PageContainer';

import qs from 'qs';
import styles from './index.less';
import { getCommentsByActivityId, submitComment } from '@/services/comments';

export interface CommentItemProps {
  id: number;
  username: string;
  actid: number;
  content: string;
  time: string;
  avatar: string;
}

const Comments = () => {
  const [commentsList, setCommentsList] = useState<CommentItemProps[]>();
  const { initialState } = useModel('@@initialState');

  const [newComment, setNewComment] = useState<string>();
  const activity_id = useMemo(() => {
    const tempid: { ActivityId?: string } = qs.parse(window.location.search.substring(1));
    if (tempid.ActivityId) {
      return tempid.ActivityId;
    } else {
      message.error('获取活动失败, 请重试!');
      history.push('/playground');
      return '';
    }
  }, [window.location.search]);

  const fetchComments = async () => {
    const res = await getCommentsByActivityId(activity_id);
    if (res.code === 1) {
      setCommentsList(res.data);
    }
  };

  const handleSubmit = async () => {
    if (newComment) {
      const res = await submitComment({ actid: activity_id, content: newComment });
      if (res?.code === 1) {
        message.success('评论成功!');
        fetchComments();
        setNewComment('');
      } else {
        message.error('评论失败, 请重试!');
      }
    } else {
      message.error('请输入评论后再提交!');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [activity_id]);

  return (
    <PageContainer>
      <div className={styles.container}>
        <Affix offsetTop={0}>
          <Card className={styles.titleBar}>不会吧不会吧不会这就是活动标题吧</Card>
        </Affix>
        <Card className={styles.main}>
          <List>
            {commentsList?.map((item, id) => {
              return (
                <Comment
                  key={id}
                  avatar={<Avatar src={item.avatar} shape="square" />}
                  content={item.content}
                  datetime={item.time}
                  author={item.username}
                />
              );
            })}
          </List>
        </Card>
        <Card className={styles.bottom}>
          <List header={<div>发表评论</div>}>
            <List.Item style={{ width: '70vw' }}>
              <Comment
                avatar={<Avatar shape="square" src={initialState.currentUser.avatar} />}
                content={
                  <>
                    <Form.Item>
                      <Input.TextArea
                        rows={4}
                        style={{ width: '65vw' }}
                        value={newComment}
                        onChange={(val) => {
                          setNewComment(val.currentTarget.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        发布评论
                      </Button>
                    </Form.Item>
                  </>
                }
              ></Comment>
            </List.Item>
          </List>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Comments;
