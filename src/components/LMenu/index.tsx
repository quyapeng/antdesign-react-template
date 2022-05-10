import { Space, Menu } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import { useLocation } from 'react-router-dom';
import {
  SmileOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import styles from './index.less';

type MenuItem = Required<MenuProps>['items'][number];

const LMenu: React.FC = (props: any) => {
  const { onClick }: any = props;
  const { pathname } = useLocation();
  // const defaultOpenKeys = getDefaultOpenKeys(pathname);
  const { initialState } = useModel('@@initialState');

  const [collapsed, setCollapsed] = React.useState(false);

  if (!initialState || !initialState.settings) {
    return null;
  }

  // const { menu }: any = initialState.currentUser;
  const getDefaultOpenKeys = (pathname: string): string[] => {
    const res: string[] = [];
    // if (!menu || menu.length == 0) return;
    // for (let i = 0; i < menu.length; i += 1) {
    //   const { children } = menu[i];
    //   children?.forEach((sub: any) => {
    //     if (sub.path === pathname) res.push(menu[i].path as string);
    //   });
    // }
    return res;
  };
  const defaultOpenKeys = getDefaultOpenKeys(pathname);

  const items: MenuItem[] = [
    getItem('欢迎页', 'welcome', <SmileOutlined />),

    getItem('系统管理', 'admin', <AppstoreOutlined />, [getItem('菜单管理', 'sub-pag')]),
  ];
  console.log('items', items);
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const { navTheme, layout } = initialState.settings;
  // console.log('currentUser', navTheme, menu);
  let className = styles.right;

  if (layout === 'top' || layout === 'mix') {
    // className = `${styles.right} ${styles.navTheme} menu`;
  }
  return (
    <Space className={className}>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        theme={navTheme as any}
        inlineCollapsed={collapsed}
        items={items}
      />
    </Space>
  );
};
export default LMenu;
