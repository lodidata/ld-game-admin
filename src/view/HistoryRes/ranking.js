export default function(Vue) {
  const i18n = Vue.$t('historyRes')
  return [
    {
      title: i18n.historyRes14,
      align: 'center',
      key: 'sort'
    },
    {
      title: i18n.historyRes15,
      align: 'center',
      key: 'user_account'
    },
    {
      title: i18n.historyRes16,
      align: 'center',
      // key: 'true_user',
      render(h, { row }) {
        return <span>{row.true_user == 1 ? i18n.historyRes19 : i18n.historyRes20 }</span>
      }
    },
    {
      title: i18n.historyRes17,
      align: 'center',
      key: 'created'
    },
    {
      title: i18n.historyRes18,
      align: 'center',
      key: 'number'
    }
  ]
}
