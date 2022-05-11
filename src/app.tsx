import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser, currentMenu } from './services/api';
import defaultSettings from '../config/defaultSettings';
import { IconData } from '@/constant/icon';
import { SmileOutlined } from '@ant-design/icons';
import React from 'react';

const loginPath = '/user/login';

const formatMenu = (list: any) => {
  let arr: any = [];
  if (list && list.length > 0) {
    list.filter((i: any) => {
      if (i.status == 'ENABLED') {
        let c: any = [];
        if (i.subMenus && i.subMenus.length > 0) {
          i.subMenus.filter((j: any) => {
            c.push({
              name: j.name,
              hideInMenu: !j.isShow,
              path: `/${i.path}/${j.path}`,
              parentKeys: [i.path],
              type: j.type,
            });
          });
        }
        arr.push({
          path: `/${i.path}`,
          routes: c,
          icon: 'smile',
          // !i.parent ? i.icon : '',
          name: i.name,
          hideInMenu: !i.isShow,
          type: i.type,
        });
      }
    });
  }
  console.log('menu', arr);
  return arr;
};

const Icon = (icon: any) => {
  // console.log(icon);
  React.createElement('HomeOutlined');
};
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg: any = await queryCurrentUser();
      const { data: menu } = await currentMenu();
      msg.data.menu = formatMenu(menu);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面 () => <LMenu onClick={({ key }: any) => history.push(key)} />
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    menuDataRender: (menu) => initialState?.currentUser?.menu || menu,
    ...initialState?.settings,
  };
};
