export default function(Vue) {
  const i18n = Vue.$t('getOutCheck')
  return [
    {
      title: i18n.getOutCheck94,
      align: 'center',
      minWidth: 80,
      key: 'name'
    },
    {
      title: i18n.getOutCheck95,
      align: 'center',
      minWidth: 80,
      key: 'level'
    },
    {
      title: i18n.getOutCheck96,
      align: 'center',
      minWidth: 100,
      key: 'log_type',
      render(h, { row }) {
        return (
          <span>
            {
              [
                i18n.getOutCheck97,
                i18n.getOutCheck98,
                i18n.getOutCheck99,
                i18n.getOutCheck100,
                i18n.getOutCheck101,
                i18n.getOutCheck102,
                i18n.getOutCheck103,
                i18n.getOutCheck104,
                i18n.getOutCheck105,
                i18n.getOutCheck106,
                i18n.getOutCheck107,
                i18n.getOutCheck108
              ][Number(row.log_type) - 1]
            }
          </span>
        )
      }
    },
    {
      title: i18n.getOutCheck109,
      align: 'center',
      minWidth: 150,
      key: 'log_value'
    },
    {
      title: i18n.getOutCheck110,
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: i18n.getOutCheck111,
      align: 'center',
      minWidth: 80,
      key: 'log_ip'
    },

    {
      title: i18n.getOutCheck112,
      align: 'center',
      minWidth: 80,
      key: 'address'
    },
    {
      title: i18n.getOutCheck113,
      align: 'center',
      minWidth: 80,
      key: 'platform',
      render(h, { row }) {
        return <span>{['pc', 'h5', 'ios', 'android'][Number(row.platform) - 1]}</span>
      }
    }
    // {
    //   title: '会员状态',
    //   align: 'center',
    //   minWidth: 80,
    //   key: 'status'
    // }
  ]
}
