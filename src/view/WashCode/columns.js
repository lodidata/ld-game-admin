export default function(Vue) {
  const i18n = Vue.$t('washCode')
  return [
    {
      title: i18n.washCode9,
      align: 'center',
      minWidth: 300,
      render(h, { row }) {
        return <span>LV{row.level}</span>
      }
    },
    {
      title: i18n.washCode10,
      align: 'center',
      key: 'percent',
      minWidth: 300,
      myExt: {
        editTxt: true
      }
    }
  ]
}
