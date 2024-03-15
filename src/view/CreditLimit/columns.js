import { MathDiv } from '@/libs/formatMath'
import expandRow from '../../components/ExpandRow'
const formatMoney = str => (str ? MathDiv(Number(str), 1) : '')

export default function(Vue) {
  const i18n = Vue.$t('creditLimit')
  return [
    {
      title: i18n.creditLimit0,
      align: 'center',
      minWidth: 140,
      key: 'count_date'
    },
    {
      title: i18n.creditLimit1,
      align: 'center',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span style={{ color: row.clear_status === 1 ? '#19be6b' : '#ed4014' }}>
            {row.clear_status === 1 ? i18n.creditLimit2 : i18n.creditLimit3}
          </span>
        )
      }
    },
    {
      title: i18n.creditLimit4,
      align: 'center',
      minWidth: 100,
      key: 'quota'
    },
    {
      title: i18n.creditLimit5,
      type: 'expand',
      width: 50,
      render: (h, params) => {
        return h(expandRow, {
          props: {
            row: params.row.info
          }
        })
      }
    }
  ]
}
