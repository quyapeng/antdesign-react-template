import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentMenu } from './services/api';
import defaultSettings from '../config/defaultSettings';
import { getLocaleInfo } from '@/utils/index';
import React from 'react';
import * as allIcons from '@ant-design/icons';

const loginPath = '/user/login';
const toHump = (name: string) =>
  name.replace(/-(\w)/g, (all: string, letter: any) => letter.toUpperCase());

const formatMenu = (list: any) => {
  let menu: any = [];
  if (list && list.length > 0) {
    list.filter((i: any) => {
      let { icon } = i;
      if (i.status == 'ENABLED') {
        let c: any = [];
        if (i.subMenus && i.subMenus.length > 0) {
          i.subMenus.filter((j: any) => {
            c.push({
              name: j.name,
              hideInMenu: !j.show,
              path: `/${i.path}/${j.path}`,
              parentKeys: [i.path],
              type: j.type,
            });
          });
        }
        const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
        const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];
        menu.push({
          path: `/${i.path}`,
          routes: c,
          icon: React.createElement(NewIcon),
          name: i.name,
          hideInMenu: !i.show,
          type: i.type,
        });
      }
    });
  }
  return menu;
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
  currentUser?: any;
  loading?: boolean;
  fetchUserInfo?: () => Promise<any>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg: any = getLocaleInfo('userinfo');
      const { data: menu } = await currentMenu();
      const list = formatMenu(menu);
      console.log(list);
      return {
        ...JSON.parse(msg),
        menu: list,
      };
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
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      console.log();
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
