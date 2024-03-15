export default function(Vue) {
  const i18n = Vue.$t('thirdPayment')
  return [
    {
      title: 'ID',
      align: 'center',
      key: 'id',
      minWidth: 70
    },
    {
      title: i18n.thirdPayment32,
      align: 'center',
      render(h, { row }) {
        return <span>{i18n.thirdPayment34}</span>
      }
    },
    {
      title: i18n.thirdPayment33,
      align: 'center',
      render(h, { row }) {
        return (
          <div>{row.created ? row.created.split(' ').map((x, i) => <p key={i}>{x}</p>) : '-'}</div>
        )
      }
    },
    {
      title: i18n.thirdPayment75,//说明
      align: 'center',
      key: 'desc',
    }
  ]
}
