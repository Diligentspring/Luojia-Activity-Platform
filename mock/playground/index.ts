import { ActivityProps } from '@/components/Activity';
import { Request, Response } from 'express';

const activitiesList: ActivityProps[] = [
  {
    id: 1,
    title: '活动1',
    desc: '这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1这是活动1',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 100,
    dislikes: 0,
    status: 4,
    participated: false,
  },
  {
    id: 2,
    title: '活动2',
    desc: '这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2这是活动2',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 200,
    dislikes: 0,
    status: 1,
    participated: true,
  },
  {
    id: 3,
    title: '活动3',
    desc: '这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3这是活动3',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 300,
    dislikes: 0,
    status: 3,
    participated: true,
  },
  {
    id: 4,
    title: '活动4',
    desc: '这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4这是活动4',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 400,
    dislikes: 0,
    status: 2,
    participated: false,
  },
  {
    id: 5,
    title: '活动5',
    desc: '这是活动5这是活动5这是活动5这是活动5这是活动5这是活动5',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 500,
    dislikes: 0,
    status: 5,
    participated: false,
  },
  {
    id: 6,
    title: '活动6',
    desc: '这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6这是活动6',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 600,
    dislikes: 0,
    status: 3,
    participated: false,
  },
  {
    id: 7,
    title: '活动7',
    desc: '这是活动7这是活动7这是活动7',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 700,
    dislikes: 0,
    status: 4,
    participated: false,
  },
  {
    id: 8,
    title: '活动8',
    desc: '这是活动8这是活动8这是活动8这是活动8',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 800,
    dislikes: 0,
    status: 5,
    participated: false,
  },
  {
    id: 9,
    title: '活动9',
    desc: '这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9这是活动9',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 900,
    dislikes: 0,
    status: 2,
    participated: true,
  },
  {
    id: 10,
    title: '活动10',
    desc: '这是活动10这是活动10这是活动10这是活动10这是活动10',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 1000,
    dislikes: 0,
    status: 1,
    participated: true,
  },
  {
    id: 11,
    title: '活动11',
    desc: '这是活动11这是活动11这是活动11这是活动11这是活动11这是活动11这是活动11',
    organizer: '魏瑄',
    creatTime: '2021-09-10',
    likes: 1100,
    dislikes: 0,
    status: 5,
    participated: true,
  },
];
const getAllResponse = (req: Request, res: Response) => {
  res.json({
    data: activitiesList,
    code: 1,
    msg: '活动获取成功!',
  });
};

const getFilterResponse = (req: Request, res: Response) => {
  const { query } = req;

  res.json({
    data: activitiesList.filter((item: ActivityProps, id: number) => {
      if (item.status?.toString() === query.key) {
        return true;
      } else {
        return false;
      }
    }),
    code: 1,
    msg: '根据条件查询活动成功!',
  });
};

export default {
  'GET /api/getall': getAllResponse,
  'GET /api/filter': getFilterResponse,
};
