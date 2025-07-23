import Icon from '@ant-design/icons';

import {
  Report,
  GlobalGoldPrice,
  Finance,
  UserManagement,
  Calendar,
  MarketAnalysis,
  SystemManagement,
  Announcement,
  SupervisorManagement,
  SuperManagement,
} from '@/components/Icons';

import {
  mapData,
  listTransformTreeData,
  findTreeData,
  filterTreeData,
} from '@/utils';
import { getState } from '@/redux';
import routePaths from '@/router/routePaths';

 

const sortData = (data: any[]) => {
  return data.sort((a, b) => {
    const aSortKey = (a.sortKey || '').split('-').join('') || data.length;
    const bSortKey = (b.sortKey || '').split('-').join('') || data.length;

    if (new Number(aSortKey) === new Number(bSortKey)) {
      return 0;
    } else if (new Number(aSortKey) < new Number(bSortKey)) {
      return -1;
    } else {
      return 1;
    }
  });
};

export const config = [
  {
    title: '页面',
    iconComponent: <Icon component={UserManagement} />,
    authorKey: 'Customer Management',
    children: [
      {
        title: '主页',
        url: routePaths.index,
        authorKey: '',
        includePaths: [routePaths.index],
      },
      {
        title: '客户端页面',
        url: routePaths.clientPage,
        authorKey: ' ',
        includePaths: [routePaths.clientPage],
      },
      {
        title: '第二个客户端页面',
        url: routePaths.secondClientPage,
        // authorKey: 'User Management',
        includePaths: [routePaths.secondClientPage],
      },
      {
        title: '第二个页面',
        url: routePaths.secondPage,
        // authorKey: 'Rebate Management',
      },
 
    ],
  },
 
];

export default async () => {
 

  return  config
};
