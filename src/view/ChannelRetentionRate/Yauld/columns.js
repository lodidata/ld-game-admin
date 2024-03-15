export default function(Vue) {
  const i18n = Vue.$t('RetentionRate')
  return [
    {
      title: i18n.RetentionRate60,//`渠道号`
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
      title: i18n.RetentionRate30,//`活跃人数`
      align: 'center',
      minWidth: 100,
      key: 'active_num_1',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate31,//`总流水`
      align: 'center',
      minWidth: 100,
      key: 'amount_1',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate33,//`人均流水`
      align: 'center',
      minWidth: 100,
      key: 'avg_amount_1',
      sortable: 'custom',
    },
    // {
    //   title: `留存率`,
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'active_rr',
    //   sortable: 'custom',
    // },
    {
      title: i18n.RetentionRate34,//`次日活跃人数`
      align: 'center',
      minWidth: 100,
      key: 'active_num_2',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate35,//`次日总流水`
      align: 'center',
      minWidth: 100,
      key: 'amount_2',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate36,//`次日人均流水`
      align: 'center',
      minWidth: 100,
      key: 'avg_amount_2',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate37,//`次日留存率`
      align: 'center',
      minWidth: 100,
      key: 'retention_2',
      render: (h, { row }) => <span>{`${row.retention_2}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate38,
      align: 'center',
      minWidth: 100,
      key: 'active_num_3',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate39,
      align: 'center',
      minWidth: 100,
      key: 'amount_3',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate40,
      align: 'center',
      minWidth: 100,
      key: 'avg_amount_3',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate41,
      align: 'center',
      minWidth: 100,
      key: 'retention_3',
      render: (h, { row }) => <span>{`${row.retention_3}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate42,
      align: 'center',
      minWidth: 100,
      key: 'active_num_5',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate43,
      align: 'center',
      minWidth: 100,
      key: 'amount_5',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate44,
      align: 'center',
      minWidth: 100,
      key: 'avg_amount_5',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate45,
      align: 'center',
      minWidth: 100,
      key: 'retention_5',
      render: (h, { row }) => <span>{`${row.retention_5}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate46,
      align: 'center',
      minWidth: 100,
      key: 'active_num_7',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate47,
      align: 'center',
      minWidth: 100,
      key: 'amount_7',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate48,
      align: 'center',
      minWidth: 100,
      key: 'avg_amount_7',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate49,
      align: 'center',
      minWidth: 100,
      key: 'retention_7',
      render: (h, { row }) => <span>{`${row.retention_7}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate50,
      align: 'center',
      minWidth: 100,
      key: 'active_num_15',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate51,
      align: 'center',
      minWidth: 100,
      key: 'amount_15',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate52,
      align: 'center',
      minWidth: 100,
      key: 'avg_amount_15',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate53,
      align: 'center',
      minWidth: 100,
      key: 'retention_15',
      render: (h, { row }) => <span>{`${row.retention_15}%`}</span>,
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate54,
      align: 'center',
      minWidth: 100,
      key: 'active_num_30',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate55,
      align: 'center',
      minWidth: 100,
      key: 'amount_30',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate56,
      align: 'center',
      minWidth: 100,
      key: 'avg_amount_30',
      sortable: 'custom',
    },
    {
      title: i18n.RetentionRate57,
      align: 'center',
      minWidth: 100,
      key: 'avg_amount_30',
      render: (h, { row }) => <span>{`${row.avg_amount_30}%`}</span>,
      sortable: 'custom',
    }
  ]
}
