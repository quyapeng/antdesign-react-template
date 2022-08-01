export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      // {
      //   path: '/user/index',
      //   name: '用户管理',
      //   component: './user/user',
      // },
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
      {
        path: '/course/source',
        name: '课程资源',
        component: './course/source',
      },
    ],
  },
  {
    path: '/users',
    icon: 'table',
    component: './App',
    routes: [
      {
        path: '/users/operation',
        name: '用户管理',
        component: './users/operation',
      },
    ],
  },
  {
    path: '/school',
    icon: 'table',
    component: './App',
    routes: [
      {
        path: '/school/school',
        name: '园所管理',
        component: './school/school',
      },
      {
        path: '/school/classroom',
        name: '教室管理',
        component: './school/classroom',
      },
    ],
  },
  //
  {
    path: '/business',
    icon: 'table',
    component: './App',
    routes: [
      {
        path: '/business/teacher',
        name: '教师管理',
        component: './school/teacher',
      },
      {
        path: '/business/student',
        name: '学生管理',
        component: './school/student',
      },
      {
        path: '/business/order/:id',
        name: '合同管理',
        component: './school/order',
      },
      {
        path: '/business/check/:id',
        name: '考勤管理',
        component: './school/check',
      },
      {
        path: '/business/calendar',
        name: '校历管理',
        component: './school/calendar',
      },
      {
        path: '/business/notice',
        name: '通知管理',
        component: './school/notice',
      },
      {
        path: '/business/food',
        name: '通知管理',
        component: './school/food',
      },
      {
        path: '/business/class',
        name: '班级管理',
        component: './school/class',
      },
      {
        path: '/business/detailCalendar/:id',
        name: '配置校历',
        component: './school/detailCalendar',
      },
      {
        path: '/business/foodDetail/:id',
        name: '配置食谱',
        component: './school/foodDetail',
      },
      {
        path: '/business/studentList/:id',
        name: '学生名单',
        component: './school/studentList',
      },
    ],
  },
  {
    component: './404',
  },
];
