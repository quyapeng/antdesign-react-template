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
    component: './Admin',
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
    path: '/Course',
    component: './Admin',
    routes: [
      {
        path: '/Course/type',
        name: '课程分类',
        component: './Course/type',
      },
      {
        path: '/Course/theme/:id',
        name: '主题',
        component: './Course/theme',
      },
    ],
  },
  {
    component: './404',
  },
];
