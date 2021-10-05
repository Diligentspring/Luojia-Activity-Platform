import { Tag } from 'antd';

export enum StatusType {
  NOT_START = 1,
  APPLYING = 2,
  RUNNING = 3,
  FINISHED = 4,
}

const Status = (props: any) => {
  const { value } = props;
  switch (value) {
    case StatusType.NOT_START:
      return (
        <Tag color="default" style={{ marginRight: 0 }}>
          尚未开始
        </Tag>
      );
    case StatusType.APPLYING:
      return (
        <Tag color="warning" style={{ marginRight: 0 }}>
          火热报名中
        </Tag>
      );
    case StatusType.RUNNING:
      return (
        <Tag color="processing" style={{ marginRight: 0 }}>
          正在进行中
        </Tag>
      );
    case StatusType.FINISHED:
      return (
        <Tag color="magenta" style={{ marginRight: 0 }}>
          已结束
        </Tag>
      );
    default:
      return (
        <Tag color="default" style={{ marginRight: 0 }}>
          其他
        </Tag>
      );
  }
};

export default Status;
