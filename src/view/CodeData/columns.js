export default function(Vue) {
  const i18n = Vue.$t('codeData')
  return [
    {
      title: i18n.codeData8,
      align: 'center',
      key: 'created',
      minWidth: 150
    },
    {
      title: i18n.codeData9,
      align: 'center',
      key: 'user_name',
      minWidth: 100
    },
    {
      title: i18n.codeData10,
      align: 'center',
      minWidth: 150,
      render(h, { row }) {
        return <span>{+row.dml_total}</span>
      }
    },
    {
      title: i18n.codeData11,
      align: 'center',
      minWidth: 150,
      render(h, { row }) {
        return <span>{+row.amount_total}</span>
      }
    },
    {
      title: i18n.codeData12,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <span
            style={{ cursor: 'pointer', color: '#2d8cf0' }}
            on-click={() => Vue.handleDetail(row)}
          >
            {i18n.codeData12}
          </span>
        )
      }
    }
  ]
}
