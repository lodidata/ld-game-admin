export default function(Vue) {
  const i18n = Vue.$t('RetentionRate')
  return [
    // {
    //   type: 'selection',
    //   width: 30,
    //   title: '',
    //   fixed: 'left',
    //   align: 'center'
    // },
    {
      title: i18n.RetentionRate60,//`渠道账号`
      align: 'center',
      minWidth: 100,
      key: 'channel_id',
      // sortable: 'custom',
    },
    {
      title: i18n.RetentionRate0,//`日期`
      align: 'center',
      minWidth: 100,
      key: 'dt',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate4,//`首充人数`
      align: 'center',
      minWidth: 100,
      key: 'first_recharge_num',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate5,//`首笔充值金`
      align: 'center',
      minWidth: 100,
      key: 'first_recharge_amount',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate6,//`次日复充人数`
      align: 'center',
      minWidth: 100,
      key: 'recharge_num_2',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate7,//`次日复充金额`
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount_2',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate8,//`留存率`
      align: 'center',
      minWidth: 100,
      key: 'retention_2',
      render: (h, { row }) => <span>{`${row.retention_2}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate9,//`人均充值`
      align: 'center',
      minWidth: 100,
      key: 'recharge_avg_2',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate10,
      align: 'center',
      minWidth: 100,
      key: 'recharge_num_3',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate11,
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount_3',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate12,
      align: 'center',
      minWidth: 100,
      key: 'retention_3',
      render: (h, { row }) => <span>{`${row.retention_3}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate13,
      align: 'center',
      minWidth: 100,
      key: 'recharge_avg_3',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate14,
      align: 'center',
      minWidth: 100,
      key: 'recharge_num_5',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate15,
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount_5',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate16,
      align: 'center',
      minWidth: 100,
      key: 'retention_5',
      render: (h, { row }) => <span>{`${row.retention_5}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate17,
      align: 'center',
      minWidth: 100,
      key: 'recharge_avg_5',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate18,
      align: 'center',
      minWidth: 100,
      key: 'recharge_num_7',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate19,
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount_7',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate20,
      align: 'center',
      minWidth: 100,
      key: 'retention_7',
      render: (h, { row }) => <span>{`${row.retention_7}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate21,
      align: 'center',
      minWidth: 100,
      key: 'recharge_avg_7',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate22,
      align: 'center',
      minWidth: 100,
      key: 'recharge_num_15',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate23,
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount_15',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate24,
      align: 'center',
      minWidth: 100,
      key: 'retention_15',
      render: (h, { row }) => <span>{`${row.retention_15}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate25,
      align: 'center',
      minWidth: 100,
      key: 'recharge_avg_15',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate26,
      align: 'center',
      minWidth: 100,
      key: 'recharge_num_30',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate27,
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount_30',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate28,
      align: 'center',
      minWidth: 100,
      key: 'retention_30',
      render: (h, { row }) => <span>{`${row.retention_30}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate29,
      align: 'center',
      minWidth: 100,
      key: 'recharge_avg_30',
      sortable: 'custom',
    }
  ]
}
