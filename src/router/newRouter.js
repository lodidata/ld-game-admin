import Main from '@/components/Main'
import that from '@/main.js'
import i18n from '../i18n/index'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  hideInBread: (false) 设为true后在面包屑不显示
 *  cache: (false) 设为true后页面会缓存，默认不缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

//let i18n_lang = i18n.messages[i18n.locale].router

export default [
  // 代理
  {
    path: '/',
    name: 'agent',
    meta: {
      icon: 'md-contacts',
      title: '代理管理',
      id: 2
    },
    component: Main,
    children: [
      // 代理列表
      {
        path: 'agent',
        name: 'agentList',
        meta: {
          title: '代理列表',
          id: 8
        },
        component: () => import('@/page/agent')
      },
      {
        path: 'agent/ip',
        name: 'ip',
        meta: {
          title: 'ip加白',
          id: 2,
          hideInMenu: true
        },
        component: () => import('@/page/agent/ip')
      },
      {
        path: 'agent/game',
        name: 'game',
        meta: {
          title: '代理游戏',
          id: 2,
          hideInMenu: true
        },
        component: () => import('@/page/agent/game')
      },
    ]
  },
    // 游戏管理
  {
    path: '/game',
    name: 'game',
    meta: {
      icon: 'md-game-controller-b',
      title: '游戏管理',
      id: 3
    },
    component: Main,
    children: [
    
      {
        path: 'gameAllList',
        name: 'gameAllList',
        meta: {
          title: '游戏列表',
          id: 25
        },
        component: () => import('@/page/gameAllList')
      },
    
      {
        path: 'gameManages',
        name: 'gameManages',
        meta: {
          title: '游戏厂商管理',
          id: 30
        },
        component: () => import('@/page/gameManage')
      },
      {
        path: 'gameManages/ip',
        name: 'gameManagesIp',
        meta: {
          title: 'ip加白',
          id: 81,
          hideInMenu: true
        },
        component: () => import('@/page/gameManage/ip')
      },
      {
        path: 'gameType',
        name: 'gameType',
        meta: {
          title: '游戏类型管理',
          id: 31
        },
        component: () => import('@/page/gameTypeManage')
      },
      // {
      //   path: 'currencyManage',
      //   name: 'currencyManage',
      //   meta: {
      //     title: '货币管理',
      //     id: 2
      //   },
      //   component: () => import('@/page/currencyManage')
      // },
    ]
  },
  // 货币管理
  {
    path: '/currency',
    name: 'currency',
    meta: {
      icon: 'logo-usd',
      title: '货币管理',
      id: 4
    },
    component: Main,
    children: [
      {
        path: 'currencyManage',
        name: 'currencyManage',
        meta: {
          title: '货币列表',
          id: 42
        },
        component: () => import('@/page/currencyManage')
      },
      {
        path: 'hidden',
        name: 'hidden',
        meta: {
          title: '',
          id: 4,
          hideInMenu: true
        },
        component: () => import('@/page/hidden')
      },
    ]
  },
  // 账单管理
  {
    path: '/',
    name: 'bill',
    meta: {
      icon: 'md-list-box',
      title: '账单管理',
      id: 6
    },
    component: Main,
    children: [
      // 月结账单
      {
        path: 'monthlyBill',
        name: 'monthlyBill',
        meta: {
          title: '月结账单',
          id: 6
        },
        component: () => import('@/page/monthlyBill')
      },
      // 新建账单
      {
        path: 'monthlyBill/addBill',
        name: 'addBill',
        meta: {
          title: '账单',
          id: 6,
          hideInMenu: true
        },
        component: () => import('@/page/monthlyBill/addBill')
      },
      // 批量导入
      {
        path: 'monthlyBill/import',
        name: 'import',
        meta: {
          title: '批量导入',
          id: 6,
          hideInMenu: true
        },
        component: () => import('@/page/monthlyBill/import')
      },
      {
        path: 'hidden',
        name: 'hidden',
        meta: {
          title: '',
          id: 6,
          hideInMenu: true
        },
        component: () => import('@/page/hidden')
      },
    ]
  },
  // 工单管理
  {
    path: '/',
    name: 'wordOrder',
    meta: {
      icon: 'md-pricetag',
      title: '工单管理',
      id: 7
    },
    component: Main,
    children: [
      // 工单列表
      {
        path: 'workOrderList',
        name: 'workOrderList',
        meta: {
          title: '工单列表',
          id: 74
        },
        component: () => import('@/page/workOrderList')
      },
      // 新增工单
      {
        path: 'workOrderList/addWorkOrder',
        name: 'addWorkOrder',
        meta: {
          title: '工单',
          id: 7,
          hideInMenu: true
        },
        component: () => import('@/page/workOrderList/addWorkOrder')
      },
      // 工单详情
      {
        path: 'workOrderList/detail',
        name: 'detail',
        meta: {
          title: '工单详情',
          id: 7,
          hideInMenu: true
        },
        component: () => import('@/page/workOrderList/detail')
      },
      {
        path: 'hidden',
        name: 'hidden',
        meta: {
          title: '',
          id: 7,
          hideInMenu: true
        },
        component: () => import('@/page/hidden')
      },
    ]
    
  },
  // 系统管理
  {
    path: '/',
    name: 'system',
    meta: {
      icon: 'md-build',
      title: '系统管理',
      id: 5
    },
    component: Main,
    children: [
      // 账号列表
      {
        path: 'account',
        name: 'account',
        meta: {
          title: '账号列表',
          id: 47
        },
        component: () => import('@/page/account')
      },
      // 权限管理
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色列表',
          id: 48
        },
        component: () => import('@/page/role')
      },
      // 操作日志
      {
        path: 'oprate',
        name: 'oprate',
        meta: {
          title: '操作日志',
          id: 62
        },
        component: () => import('@/page/oprate')
      },
    ]
  },
]
