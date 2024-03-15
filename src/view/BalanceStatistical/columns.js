import { MathDiv } from '@/libs/formatMath'
export default function(Vue) {
  const i18n = Vue.$t('balanceStatistical')
  return [
    {
      title: i18n.balanceStatistical0,
      align: 'center',
      minWidth: 80,
      render: (h, { row, index }) => <span>{index + 1}</span>
    },
    {
      title: i18n.balanceStatistical1,
      align: 'center',
      minWidth: 100,
      key: 'name'
    },
    {
      title: i18n.balanceStatistical2,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{MathDiv(Number(row.balance), 1)}</span>
      }
    }
  ]
}
