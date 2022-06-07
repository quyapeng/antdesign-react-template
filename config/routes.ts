export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: '欢迎页',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  {
    path: '/system',
    name: '菜单',
    icon: 'crown',
    component: './App',
    routes: [
      {
        path: '/system/menu',
        name: 'menu',
        component: './system/menu',
      },
      {
        path: '/system/role',
        name: 'role',
        component: './system/role',
      },
    ],
  },
  {
    name: '课程管理',
    icon: 'table',
    path: '/course',
    component: './App',
    routes: [
      {
        path: '/course/type',
        name: '课程分类',
        component: './course/type',
      },
      {
        path: '/course/theme/:id',
        name: '主题',
        component: './course/theme',
      },
    ],
  },
  {
    component: './404',
  },
];
