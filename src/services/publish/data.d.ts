export type ActivityProps = {
    id: number;
    title: string; // 活动标题
    introduction: string; // 活动描述
    organizer: string; // 组织者
    time_start: string; // 活动开始时间
    time_end: string; // 活动结束时间
    site: string; // 活动地点
    status: StatusType; // 活动状态
    number_people: number; // 招募人数
    already_register: number; // 已有人数
    deadline: number; // 截止时间
    likes: number; // 点赞数
    hate: number; // 点踩数
    participated: boolean; // 是否已参加
  };