import { MathDiv } from '@/libs/formatMath'

export default function(Vue) {
  const i18n = Vue.$t('components')
  return [
    {
      title: i18n.components193,
      align: 'center',
      key: 'date',
      minWidth: 100
    },
    {
      title: i18n.components194,
      align: 'center',
      key: 'dml',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.dml ? MathDiv(row.dml, 1) : 0}</span>
      }
    }
  ]
}
