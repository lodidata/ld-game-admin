// 运营数据
export const operateData = function(Vue) {
  const i18n = Vue.$t('home')
  return [
    {
      title: i18n.home30,
      align: 'center',
      minWidth: 80,
      key: 'day',
      sortable: 'custom'
    },
    {
      title: i18n.home31,
      align: 'center',
      minWidth: 80,
      key: 'register_new'
    },
    {
      title: i18n.home32,
      align: 'center',
      minWidth: 80,
      key: 'game_user_count'
    },
    {
      title: i18n.home33,
      align: 'center',
      minWidth: 80,
      key: 'recharge_total'
    },
    {
      title: i18n.home58,
      align: 'center',
      minWidth: 80,
      key: 'recharge_witchdraw'
    },
    {
      title: i18n.home34,
      align: 'center',
      minWidth: 80,
      key: 'recharge_witchdraw'
    },
    {
      title: i18n.home35,
      align: 'center',
      minWidth: 80,
      key: 'dml_total'
    },
    {
      title: i18n.home36,
      align: 'center',
      minWidth: 80,
      render: (h, { row }) => <span>{`${row.inversion_rate}%`}</span>
    },
    {
      title: `ARPPU`,
      align: 'center',
      minWidth: 80,
      render: (h, { row }) => <span>{`${row.arppu}%`}</span>
    },
    {
      title: i18n.home37,
      align: 'center',
      minWidth: 80,
      render: (h, { row }) => <span>{`${row.next_day_extant}%`}</span>
    },
  ]
}
// 新增数据
export const theNewData = function(Vue) {
  const i18n = Vue.$t('home')
  return [
    {
      title: i18n.home30,
      align: 'center',
      minWidth: 80,
      key: 'day',
      sortable: 'custom'
    },
    {
      title: i18n.home39,
      align: 'center',
      minWidth: 80,
      key: 'register_new'
    },
    {
      title: i18n.home40,
      align: 'center',
      minWidth: 80,
      key: 'recharge_first_count'
    },
    {
      title: i18n.home41,
      align: 'center',
      minWidth: 80,
      key: 'user_agent'
    },
    {
      title: i18n.home42,
      align: 'center',
      minWidth: 80,
      key: 'agent_new_user_count'
    },
    {
      title: i18n.home43,
      align: 'center',
      minWidth: 80,
      key: 'recharge_first_money'
    },
    {
      title: i18n.home44,
      align: 'center',
      minWidth: 80,
      key: 'recharge_first_avg'
    }
  ]
}
