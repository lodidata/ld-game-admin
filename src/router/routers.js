import Main from '@/components/Main'
import that from '@/main.js'
import i18n from '../i18n/index'
import newRoutes from './newRouter'
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

let i18n_lang = i18n.messages[i18n.locale].router

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: i18n_lang.router0
    },
    component: () => import('@/view/Login')
  },
  // 首页
  {
    path: '/',
    name: i18n_lang.router1,
    redirect: '/home',
    component: Main,
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        title: i18n_lang.router1,
        icon: 'md-analytics',
        id: 0
      },
      component: () => import('@/page/home')
    }]
  },
  // 注单查询
  // {
  //   path: '/order',
  //   name: 'order',
  //   meta: {
  //     icon: '_dingdan',
  //     title: i18n_lang.router2,
  //     id: 10
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'lotteryOrder',
  //       name: 'lotteryOrder',
  //       meta: {
  //         title: i18n_lang.router3,
  //         id: 2
  //       },
  //       component: () => import('@/view/LotteryOrder')
  //     },
  //     {
  //       path: 'chessOrder',
  //       name: 'chessOrder',
  //       meta: {
  //         title: i18n_lang.router4,
  //         id: 4
  //       },
  //       component: () => import('@/view/ChessOrder')
  //     },
  //     {
  //       path: 'sportOrder',
  //       name: 'sportOrder',
  //       meta: {
  //         title: i18n_lang.router5,
  //         id: 4
  //       },
  //       component: () => import('@/view/SportOrder')
  //     },
  //     {
  //       path: 'liveOrder',
  //       name: 'liveOrder',
  //       meta: {
  //         title: i18n_lang.router6,
  //         id: 4
  //       },
  //       component: () => import('@/view/LiveOrder')
  //     },
  //     {
  //       path: 'buYuOrder',
  //       name: 'buYuOrder',
  //       meta: {
  //         title: i18n_lang.router7,
  //         id: 4
  //       },
  //       component: () => import('@/view/BuYuOrder')
  //     },
  //     {
  //       path: 'electronicOrder',
  //       name: 'electronicOrder',
  //       meta: {
  //         title: i18n_lang.router8,
  //         id: 4
  //       },
  //       component: () => import('@/view/ElectronicOrder')
  //     },
  //     {
  //       path: 'athleticsOrder',
  //       name: 'athleticsOrder',
  //       meta: {
  //         title: i18n_lang.router69,
  //         id: 4
  //       },
  //       component: () => import('@/view/AthleticsOrder')
  //     },
  //     {
  //       path: 'arcadeGameOrder',
  //       name: 'arcadeGameOrder',
  //       meta: {
  //         title: i18n_lang.router70,
  //         id: 4
  //       },
  //       component: () => import('@/view/ArcadeGameOrder')
  //     },
  //     {
  //       path: 'eminentOrder',
  //       name: 'eminentOrder',
  //       meta: {
  //         title: i18n_lang.router71,
  //         id: 4
  //       },
  //       component: () => import('@/view/EminentOrder')
  //     },
  //     {
  //       path: 'gamecockOrder',
  //       name: 'gamecockOrder',
  //       meta: {
  //         title: i18n_lang.router75,
  //         id: 4
  //       },
  //       component: () => import('@/view/GamecockOrder')
  //     },
  //     {
  //       path: 'bingoOrder',
  //       name: 'ningoOrder',
  //       meta: {
  //         title: `BINGO`,
  //         id: 4
  //       },
  //       component: () => import('@/view/BingoOrder')
  //     }
  //   ]
  // },
  //彩票管理
  // {
  //   path: '/lottery',
  //   name: 'lottery',
  //   meta: {
  //     icon: '_caipiao',
  //     title: i18n_lang.router9,
  //     id: 6
  //   },
  //   component: Main,
  //   children: [{
  //       path: 'lotterySet',
  //       name: 'lotterySet',
  //       meta: {
  //         title: i18n_lang.router10,
  //         id: 7
  //       },
  //       component: () => import('@/view/LotterySet')
  //     },
  //     {
  //       path: 'lotteryIcon',
  //       name: 'lotteryIcon',
  //       meta: {
  //         title: i18n_lang.router11,
  //         id: 240
  //       },
  //       component: () => import('@/view/LotteryIcon')
  //     },
  //     {
  //       path: 'lotterySwitch',
  //       name: 'lotterySwitch',
  //       meta: {
  //         title: i18n_lang.router12,
  //         id: 14
  //       },
  //       component: () => import('@/view/LotterySwitch')
  //     },
  //     {
  //       path: 'specialOddsSet',
  //       name: 'specialOddsSet',
  //       meta: {
  //         title: i18n_lang.router13,
  //         id: 18
  //       },
  //       component: () => import('@/view/SpecialOddsSet')
  //     },
  //     {
  //       path: 'lotteryHallSet',
  //       name: 'lotteryHallSet',
  //       meta: {
  //         title: i18n_lang.router14,
  //         id: 21
  //       },
  //       component: () => import('@/view/LotteryHallSet')
  //     },
  //     {
  //       path: 'lotteryMoneyLimit',
  //       name: 'lotteryMoneyLimit',
  //       meta: {
  //         title: i18n_lang.router15,
  //         id: 24
  //       },
  //       component: () => import('@/view/LotteryMoneyLimit')
  //     },
  //     {
  //       path: 'lotteryOddsSet',
  //       name: 'lotteryOddsSet',
  //       meta: {
  //         title: i18n_lang.router16,
  //         id: 31
  //       },
  //       component: () => import('@/view/LotteryOddsSet')
  //     },
  //     {
  //       path: 'selfOpenManage',
  //       name: 'selfOpenManage',
  //       meta: {
  //         title: i18n_lang.router17,
  //         id: 35
  //       },
  //       component: () => import('@/view/SelfOpenManage')
  //     },
  //     {
  //       path: 'historyRes',
  //       name: 'historyRes',
  //       meta: {
  //         title: i18n_lang.router18,
  //         id: 40
  //       },
  //       component: () => import('@/view/HistoryRes')
  //     }
  //   ]
  // },
  //账号管理
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   meta: {
  //     icon: 'md-person',
  //     title: i18n_lang.router19,
  //     id: 42
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'memberManage',
  //       name: 'memberManage',
  //       meta: {
  //         title: i18n_lang.router20,
  //         id: 43
  //       },
  //       component: () => import('@/view/MemberManage')
  //     },
  //     {
  //       path: 'memberLevel',
  //       name: 'memberLevel',
  //       meta: {
  //         title: i18n_lang.router21,
  //         id: 50
  //       },
  //       component: () => import('@/view/MemberLevel')
  //     },
  //     {
  //       path: 'memberLevelDetail',
  //       name: 'memberLevelDetail',
  //       meta: {
  //         title: i18n_lang.router22,
  //         hideInMenu: true,
  //         id: 43
  //       },
  //       component: () => import('@/view/MemberLevelDetail')
  //     },
  //     {
  //       path: 'memberLabel',
  //       name: 'memberLabel',
  //       meta: {
  //         title: i18n_lang.router23,
  //         id: 56
  //       },
  //       component: () => import('@/view/MemberLabel')
  //     },
  //     {
  //       path: 'adminList',
  //       name: 'adminList',
  //       meta: {
  //         title: i18n_lang.router24,
  //         id: 61
  //       },
  //       component: () => import('@/view/AdminList')
  //     },
  //     {
  //       path: 'adminRole',
  //       name: 'adminRole',
  //       meta: {
  //         title: i18n_lang.router25,
  //         id: 68
  //       },
  //       component: () => import('@/view/AdminRole')
  //     },
  //     {
  //       path: 'application',
  //       name: 'application',
  //       meta: {
  //         title: i18n_lang.router96, //`代理申请`
  //         id: 359
  //       },
  //       component: () => import('@/view/Application')
  //     },
  //     {
  //       path: 'dataVerification',
  //       name: 'dataVerification',
  //       meta: {
  //         title: i18n_lang.router99, //`资料审核`
  //         id: 365
  //       },
  //       component: () => import('@/view/DataVerification')
  //     },
  //   ]
  // },
  // 现金管理
  // {
  //   path: '/cash',
  //   name: 'cash',
  //   meta: {
  //     icon: '_iconfontqian',
  //     title: i18n_lang.router26,
  //     id: 73
  //   },
  //   component: Main,
  //   children: [{
  //       path: 'manual',
  //       name: 'manual',
  //       meta: {
  //         title: i18n_lang.router27,
  //         id: 74
  //       },
  //       component: () => import('@/view/Manual')
  //     },
  //     {
  //       path: 'payManage',
  //       name: 'payManage',
  //       meta: {
  //         title: i18n_lang.router28,
  //         id: 86
  //       },
  //       component: () => import('@/view/PayManage')
  //     },
  //     {
  //       path: 'getOutCheck',
  //       name: 'getOutCheck',
  //       meta: {
  //         title: i18n_lang.router29,
  //         id: 89
  //       },
  //       component: () => import('@/view/GetOutCheck')
  //     },
  //     {
  //       path: 'thirdAdvance',
  //       name: 'thirdAdvance',
  //       meta: {
  //         title: i18n_lang.router30,
  //         id: 95
  //       },
  //       component: () => import('@/view/ThirdAdvance')
  //     },
  //     {
  //       path: 'moneyDetail',
  //       name: 'moneyDetail',
  //       meta: {
  //         title: i18n_lang.router31,
  //         id: 100
  //       },
  //       component: () => import('@/view/MoneyDetail')
  //     },
  //     {
  //       path: 'balanceStatistical',
  //       name: 'balanceStatistical',
  //       meta: {
  //         title: i18n_lang.router32,
  //         id: 102
  //       },
  //       component: () => import('@/view/BalanceStatistical')
  //     },
  //     {
  //       path: 'balaceTransfer',
  //       name: 'balaceTransfer',
  //       meta: {
  //         title: i18n_lang.router33,
  //         id: 104
  //       },
  //       component: () => import('@/view/BalaceTransfer')
  //     },
  //     {
  //       path: 'receivableBank',
  //       name: 'receivableBank',
  //       meta: {
  //         title: i18n_lang.router34,
  //         id: 107
  //       },
  //       component: () => import('@/view/ReceivableBank')
  //     },
  //     {
  //       path: 'thirdPayment',
  //       name: 'thirdPayment',
  //       meta: {
  //         title: i18n_lang.router35,
  //         id: 95
  //       },
  //       component: () => import('@/view/ThirdPayment')
  //     },
  //     {
  //       path: 'thirdDetail/:id/:name',
  //       name: 'thirdDetail',
  //       meta: {
  //         title: i18n_lang.router36,
  //         hideInMenu: true,
  //         id: 73
  //       },
  //       component: () => import('@/view/ThirdDetail')
  //     },
  //     {
  //       path: 'addGivePrizes',
  //       name: 'addGivePrizes',
  //       meta: {
  //         title: i18n_lang.router83,
  //         id: 319
  //       },
  //       component: () => import('@/view/AddGivePrizes')
  //     }
  //   ]
  // },
  // 网站管理
  // {
  //   path: '/site',
  //   name: 'site',
  //   meta: {
  //     icon: 'md-trophy',
  //     title: i18n_lang.router37,
  //     id: 123
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'ipSet',
  //       name: 'ipSet',
  //       meta: {
  //         title: i18n_lang.router82,
  //         id: 294
  //       },
  //       component: () => import('@/view/IpSet')
  //     },
  //     {
  //       path: 'adList',
  //       name: 'adList',
  //       meta: {
  //         title: i18n_lang.router38,
  //         id: 124
  //       },
  //       component: () => import('@/view/AdList')
  //     },
  //     {
  //       path: 'noticeManage',
  //       name: 'noticeManage',
  //       meta: {
  //         title: i18n_lang.router39,
  //         id: 130
  //       },
  //       component: () => import('@/view/NoticeManage')
  //     },
  //     {
  //       path: 'messageManage',
  //       name: 'messageManage',
  //       meta: {
  //         title: i18n_lang.router40,
  //         id: 141
  //       },
  //       component: () => import('@/view/MessageManage')
  //     },
  //     {
  //       path: 'communityBBS',
  //       name: 'communityBBS',
  //       meta: {
  //         title: i18n_lang.router76,
  //         id: 274
  //       },
  //       component: () => import('@/view/CommunityBBS')
  //     },
  //     {
  //       path: 'videoManagement',
  //       name: 'videoManagement',
  //       meta: {
  //         title: i18n_lang.router79,
  //         id: 285
  //       },
  //       component: () => import('@/view/VideoManagement')
  //     },
  //     {
  //       path: 'feedback',
  //       name: 'feedback',
  //       meta: {
  //         title: i18n_lang.router100,
  //         id: 371
  //       },
  //       component: () => import('@/view/Feedback')
  //     },
  //     {
  //       path: 'agencyImage',
  //       name: 'agencyImage',
  //       meta: {
  //         title: `${i18n_lang.router104}`,
  //         id: 391
  //       },
  //       component: () => import('@/view/AgencyImage')
  //     },
  //     {
  //       path: 'squeezePage',
  //       name: 'squeezePage',
  //       meta: {
  //         title: `${i18n_lang.router105}`,
  //         id: 390
  //       },
  //       component: () => import('@/view/SqueezePage')
  //     },
  //     {
  //       path: 'topConfiguration',
  //       name: 'topConfiguration',
  //       meta: {
  //         title: `${i18n_lang.router106_v1_2_4_4}`,
  //         id: 413
  //       },
  //       component: () => import('@/view/TopConfiguration')
  //     },
  //     {
  //       path: 'tripartiteLogo',
  //       name: 'tripartiteLogo',
  //       meta: {
  //         title: `${i18n_lang.router107_v1_2_4_9}`,
  //         id: 436
  //       },
  //       component: () => import('@/view/TripartiteLogo')
  //     }
  //   ]
  // },
  //报表管理
  // {
  //   path: '/report',
  //   name: 'report',
  //   meta: {
  //     icon: '_bingtu',
  //     title: i18n_lang.router41,
  //     id: 146
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'bussinessReport',
  //       name: 'bussinessReport',
  //       meta: {
  //         title: i18n_lang.router42,
  //         id: 147
  //       },
  //       component: () => import('@/view/BussinessReport')
  //     },
  //     {
  //       path: 'reportDetail',
  //       name: 'reportDetail',
  //       meta: {
  //         title: i18n_lang.router43,
  //         hideInMenu: true,
  //         id: 146
  //       },
  //       component: () => import('@/view/ReportDetail')
  //     },
  //     {
  //       path: 'agentReport',
  //       name: 'agentReport',
  //       meta: {
  //         title: i18n_lang.router44,
  //         id: 149
  //       },
  //       component: () => import('@/view/AgentReport')
  //     },
  //     {
  //       path: 'userReport',
  //       name: 'userReport',
  //       meta: {
  //         title: i18n_lang.router45,
  //         id: 151
  //       },
  //       component: () => import('@/view/UserReport')
  //     },
  //     {
  //       path: 'outInReport',
  //       name: 'outInReport',
  //       meta: {
  //         title: i18n_lang.router46,
  //         id: 153
  //       },
  //       component: () => import('@/view/OutInReport')
  //     },
  //     {
  //       path: 'outInReport2',
  //       name: 'outInReport2',
  //       meta: {
  //         title: `${i18n_lang.router46}2`,
  //         id: 266
  //       },
  //       component: () => import('@/view/OutInReport2')
  //     },
  //     {
  //       path: 'outInReportDetail',
  //       name: 'outInReportDetail',
  //       meta: {
  //         title: i18n_lang.router47,
  //         hideInMenu: true,
  //         id: 146
  //       },
  //       component: () => import('@/view/OutInReportDetail')
  //     },
  //     {
  //       path: 'backWaterReport',
  //       name: 'backWaterReport',
  //       meta: {
  //         title: i18n_lang.router48,
  //         id: 236
  //       },
  //       component: () => import('@/view/BackWaterReport')
  //     },
  //     {
  //       path: 'lotteryReport',
  //       name: 'lotteryReport',
  //       meta: {
  //         title: i18n_lang.router49,
  //         id: 258
  //       },
  //       component: () => import('@/view/LotteryReport')
  //     },
  //     // {
  //     //   path: 'RetentionRate',
  //     //   name: 'RetentionRate',
  //     //   meta: {
  //     //     title: `留存率报表`,
  //     //     id: 258
  //     //   },
  //     //   component: () => import('@/view/RetentionRate')
  //     // },
  //     {
  //       path: 'RechargeRetentionRate',
  //       name: 'RechargeRetentionRate',
  //       meta: {
  //         title: i18n_lang.router73,
  //         id: 268
  //       },
  //       component: () => import('@/view/RetentionRate/Recharge')
  //     },
  //     {
  //       path: 'YauldRetentionRate',
  //       name: 'YauldRetentionRate',
  //       meta: {
  //         title: i18n_lang.router74,
  //         id: 269
  //       },
  //       component: () => import('@/view/RetentionRate/Yauld')
  //     },
  //     {
  //       path: 'givePrizes',
  //       name: 'givePrizes',
  //       meta: {
  //         title: i18n_lang.router83,
  //         id: 297
  //       },
  //       component: () => import('@/view/GivePrizes')
  //     },
  //     {
  //       path: 'ipRankingList',
  //       name: 'ipRankingList',
  //       meta: {
  //         title: i18n_lang.router91,
  //         id: 335
  //       },
  //       component: () => import('@/view/IpRankingList')
  //     },
  //     {
  //       path: 'realTimeReport',
  //       name: 'realTimeReport',
  //       meta: {
  //         title: `${i18n_lang.router101}`,
  //         id: 374
  //       },
  //       component: () => import('@/view/RealTimeReport')
  //     },
  //     {
  //       path: 'gameOperations',
  //       name: 'gameOperations',
  //       meta: {
  //         title: `${i18n_lang.router102}`,
  //         id: 379
  //       },
  //       component: () => import('@/view/GameOperations')
  //     },
  //     {
  //       path: 'topUpFlow',
  //       name: 'topUpFlow',
  //       meta: {
  //         title: `${i18n_lang.router103}`,
  //         id: 385
  //       },
  //       component: () => import('@/view/TopUpFlow')
  //     },
  //     {
  //       path: 'ipFreezing',
  //       name: 'ipFreezing',
  //       meta: {
  //         title: `${i18n_lang.router106_v_1_2_4_7}`,
  //         id: 419
  //       },
  //       component: () => import('@/view/IpFreezing')
  //     }
  //   ]
  // },
  //系统管理
  // {
  //   path: '/system',
  //   name: 'system',
  //   meta: {
  //     icon: 'md-cog',
  //     title: i18n_lang.router50,
  //     id: 155
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'gameManage',
  //       name: 'gameManage',
  //       meta: {
  //         title: i18n_lang.router51,
  //         id: 156
  //       },
  //       component: () => import('@/view/GameManage')
  //     },
  //     {
  //       path: 'verticalSubMenu',
  //       name: 'verticalSubMenu',
  //       meta: {
  //         title: i18n_lang.router52,
  //         hideInMenu: true,
  //         id: 155
  //       },
  //       component: () => import('@/view/GameManage/Vertical/SubMenu')
  //     },
  //     {
  //       path: 'acrossSubMenu',
  //       name: 'acrossSubMenu',
  //       meta: {
  //         title: i18n_lang.router52,
  //         hideInMenu: true,
  //         id: 155
  //       },
  //       component: () => import('@/view/GameManage/Across/SubMenu')
  //     },
  //     {
  //       path: 'hotSubMenu',
  //       name: 'hotSubMenu',
  //       meta: {
  //         title: i18n_lang.router52,
  //         hideInMenu: true,
  //         id: 155
  //       },
  //       component: () => import('@/view/GameManage/Hot/SubMenu')
  //     },
  //     // {
  //     //   path: 'gameManage',
  //     //   name: 'gameManage',
  //     //   meta: {
  //     //     title: '游戏管理',
  //     //     id: 159
  //     //   },
  //     //   component: () => import('@/view/GameManage')
  //     // },
  //     {
  //       path: 'loginSecurity',
  //       name: 'loginSecurity',
  //       meta: {
  //         title: i18n_lang.router53,
  //         id: 162
  //       },
  //       component: () => import('@/view/LoginSecurity')
  //     },
  //     {
  //       path: 'hallNotice',
  //       name: 'hallNotice',
  //       meta: {
  //         title: i18n_lang.router54,
  //         id: 174
  //       },
  //       component: () => import('@/view/HallNotice')
  //     },
  //     {
  //       path: 'systemSet',
  //       name: 'systemSet',
  //       meta: {
  //         title: i18n_lang.router55,
  //         id: 176
  //       },
  //       component: () => import('@/view/SystemSet')
  //     },
  //     {
  //       path: 'serviceAccount',
  //       name: 'serviceAccount',
  //       meta: {
  //         title: i18n_lang.router56,
  //         id: 231
  //       },
  //       component: () => import('@/view/ServiceAccount')
  //     },
  //     {
  //       path: 'memberLog',
  //       name: 'memberLog',
  //       meta: {
  //         title: i18n_lang.router57,
  //         id: 219
  //       },
  //       component: () => import('@/view/MemberLog')
  //     },
  //     {
  //       path: 'adminLog',
  //       name: 'adminLog',
  //       meta: {
  //         title: i18n_lang.router58,
  //         id: 218
  //       },
  //       component: () => import('@/view/AdminLog')
  //     },
  //     {
  //       path: 'appManagement',
  //       name: 'appManagement',
  //       meta: {
  //         title: i18n_lang.router59,
  //         id: 262
  //       },
  //       component: () => import('@/view/AppManagement')
  //     }
  //   ]
  // },
  //活动管理
  // {
  //   path: '/activity',
  //   name: 'activity',
  //   meta: {
  //     icon: '_yingxiao',
  //     title: i18n_lang.router60,
  //     id: 183
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'activeList',
  //       name: 'activeList',
  //       meta: {
  //         title: i18n_lang.router61,
  //         id: 184
  //       },
  //       component: () => import('@/view/ActiveList')
  //     },
  //     {
  //       path: 'joinList',
  //       name: 'joinList',
  //       meta: {
  //         title: i18n_lang.router62,
  //         id: 192
  //       },
  //       component: () => import('@/view/JoinList')
  //     },
  //     {
  //       path: 'rebateActivity',
  //       name: 'rebateActivity',
  //       meta: {
  //         title: i18n_lang.router63,
  //         id: 246
  //       },
  //       component: () => import('@/view/RebateActivity')
  //     },
  //     {
  //       path: 'washCode',
  //       name: 'washCode',
  //       meta: {
  //         title: i18n_lang.router64,
  //         id: 251
  //       },
  //       component: () => import('@/view/WashCode')
  //     },
  //     {
  //       path: 'codeData',
  //       name: 'codeData',
  //       meta: {
  //         title: i18n_lang.router65,
  //         id: 254
  //       },
  //       component: () => import('@/view/CodeData')
  //     },
  //     {
  //       path: 'rebateList',
  //       name: 'rebateList',
  //       meta: {
  //         title: i18n_lang.router72,
  //         id: 264
  //       },
  //       component: () => import('@/view/RebateList')
  //     }
  //   ]
  // },
  //股东设置
  // {
  //   path: '/stockholder',
  //   name: 'stockholder',
  //   meta: {
  //     icon: 'md-contacts',
  //     title: i18n_lang.router81,//股东设置
  //     id: 293
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'Occupy',
  //       name: 'Occupy',
  //       meta: {
  //         title: i18n_lang.router80,//`占成设置`
  //         id: 290
  //       },
  //       component: () => import('@/view/Occupy')
  //     },
  //     {
  //       path: 'profitSet',
  //       name: 'profitSet',
  //       meta: {
  //         title: i18n_lang.router78,//`代理盈利结算设置`
  //         id: 280
  //       },
  //       component: () => import('@/view/ProfitSet')
  //     },
  //     {
  //       path: 'ClearingAgent',
  //       name: 'ClearingAgent',
  //       meta: {
  //         title: i18n_lang.router77,//`代理结算报表`
  //         id: 283
  //       },
  //       component: () => import('@/view/ClearingAgent')
  //     },
  //     {
  //       path: '/shareholderDataSetting',
  //       name: 'shareholderDataSetting',
  //       meta: {
  //         title: i18n_lang.router84,//`股东实时数据开关`
  //         id: 299
  //       },
  //       component: () => import('@/view/ShareholderDataSetting')
  //     }
  //   ]
  // },
  //返佣结算
  // {
  //   path: '/rebate',
  //   name: 'rebate',
  //   meta: {
  //     icon: 'ios-speedometer',
  //     title: i18n_lang.router85,//`返佣结算`
  //     id: 302
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'rebateParticipation',
  //       name: 'rebateParticipation',
  //       meta: {
  //         title: i18n_lang.router86,//`结算盈亏参与比`
  //         id: 303
  //       },
  //       component: () => import('@/view/RebateParticipation')
  //     },
  //     {
  //       path: 'profitAndLoss',
  //       name: 'profitAndLoss',
  //       meta: {
  //         title: i18n_lang.router88,//`盈亏设置`
  //         id: 309
  //       },
  //       component: () => import('@/view/ProfitAndLoss')
  //     },
  //     {
  //       path: 'rebateSet',
  //       name: 'rebateSet',
  //       meta: {
  //         title: i18n_lang.router87,//`盈亏成本设置`
  //         id: 306
  //       },
  //       component: () => import('@/view/RebateSet')
  //     },
  //     {
  //       path: 'profitStatement',
  //       name: 'profitStatement',
  //       meta: {
  //         title: i18n_lang.router89,//`盈亏结算报表`
  //         id: 312
  //       },
  //       component: () => import('@/view/ProfitStatement')
  //     }
  //   ]
  // },
  // 渠道管理
  // {
  //   path: '/channel',
  //   name: 'channel',
  //   meta: {
  //     icon: 'md-cloud-download',
  //     title: i18n_lang.router92,//`渠道管理`
  //     id: 343
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'channelList',
  //       name: 'channelList',
  //       meta: {
  //         title: i18n_lang.router93,//`渠道列表`
  //         id: 344
  //       },
  //       component: () => import('@/view/ChannelList')
  //     },
  //     {
  //       path: 'channelReport',
  //       name: 'channelReport',
  //       meta: {
  //         title: i18n_lang.router94,//`渠道报表汇总`
  //         id: 353
  //       },
  //       component: () => import('@/view/ChannelReport')
  //     },
  //     {
  //       path: 'channelDownload',
  //       name: 'channelDownload',
  //       meta: {
  //         title: i18n_lang.router95,//`下载页配置`
  //         id: 348
  //       },
  //       component: () => import('@/view/ChannelDownload')
  //     },
  //     {
  //       path: 'RechargeChannelRetentionRate',
  //       name: 'RechargeChannelRetentionRate',
  //       meta: {
  //         title: i18n_lang.router97,//`渠道充值留存`
  //         id: 356
  //       },
  //       component: () => import('@/view/ChannelRetentionRate/Recharge')
  //     },
  //     {
  //       path: 'YauldChannelRetentionRate',
  //       name: 'YauldChannelRetentionRate',
  //       meta: {
  //         title: i18n_lang.router98,//`渠道活跃留存`
  //         id: 362
  //       },
  //       component: () => import('@/view/ChannelRetentionRate/Yauld')
  //     },
  //     {
  //       path: 'agencyRelation',
  //       name: 'agencyRelation',
  //       meta: {
  //         title: i18n_lang.router107_v1_2_5_0,//`渠道代理包生成`
  //         id: 362
  //       },
  //       component: () => import('@/view/AgencyRelation')
  //     },
  //   ]
  // },
  //电访客服
  // {
  //   path: '/callService',
  //   name: 'service',
  //   meta: {
  //     icon: '_kefu',
  //     title: i18n_lang.router66,
  //     id: 315
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'callCustomerService',
  //       name: 'callCustomerService',
  //       meta: {
  //         title: i18n_lang.router90,
  //         id: 316,
  //         cache: true,
  //         icon: '_kefu'
  //       },
  //       component: () => import('@/view/CallCustomerService')
  //     },
  //   ]
  // },
  // {
  //   path: '/service',
  //   name: 'service',
  //   meta: {
  //     icon: '_kefu',
  //     title: i18n_lang.router66,
  //     id: 195
  //   },
  //   component: Main,
  //   children: [{
  //       path: 'thirdservice',
  //       name: 'thirdservice',
  //       meta: {
  //         title: i18n_lang.router67,
  //         id: 196,
  //         cache: true,
  //         icon: '_kefu'
  //       },
  //       component: () => import('@/view/ThirdService')
  //     }
  //     // {
  //     //   path: 'serviceCount',
  //     //   name: 'serviceCount',
  //     //   meta: {
  //     //     title: '客服统计',
  //     //     id: 199
  //     //   },
  //     //   component: () => import('@/view/ServiceCount')
  //     // },
  //     // {
  //     //   path: 'ServiceRecord',
  //     //   name: 'ServiceRecord',
  //     //   meta: {
  //     //     title: '客服记录',
  //     //     id: 202,
  //     //     cache: true
  //     //   },
  //     //   component: () => import('@/view/ServiceRecord')
  //     // },
  //     // {
  //     //   path: 'serviceLog',
  //     //   name: 'serviceLog',
  //     //   meta: {
  //     //     title: '客服绩效',
  //     //     id: 205
  //     //   },
  //     //   component: () => import('@/view/ServiceLog')
  //     // },
  //     // {
  //     //   path: 'ServiceSet',
  //     //   name: 'ServiceSet',
  //     //   meta: {
  //     //     title: '客服设置',
  //     //     id: 207
  //     //   },
  //     //   component: () => import('@/view/ServiceSet')
  //     // }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/ErrorPage/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/ErrorPage/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/ErrorPage/404.vue')
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [{
      path: 'error_logger_page',
      name: 'error_logger_page',
      meta: {
        icon: 'ios-bug',
        title: i18n_lang.router68
      },
      component: () => import('@/view/ErrorPage/ErrorLogger.vue')
    }]
  },
  // 账号与权限
  // 渠道管理
  ...newRoutes
  
]
