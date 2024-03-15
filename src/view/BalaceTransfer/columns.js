import { MathDiv } from '@/libs/formatMath'
export default function(Vue) {
  const i18n = Vue.$t('balaceTransfer')
  return [
    {
      title: i18n.balaceTransfer23,
      align: 'center',
      minWidth: 100,
      key: 'username',
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.balaceTransfer24 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.username}
          </span>
        )
      }
    },
    {
      title: i18n.balaceTransfer25,
      align: 'center',
      minWidth: 100,
      key: 'out_name'
    },
    {
      title: i18n.balaceTransfer26,
      align: 'center',
      minWidth: 100,
      key: 'in_name'
    },
    {
      title: i18n.balaceTransfer27,
      align: 'center',
      minWidth: 120,
      key: 'no'
    },
    {
      title: i18n.balaceTransfer28,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{Number(row.type) === 1 ? i18n.balaceTransfer29 : i18n.balaceTransfer30}</span>
      }
    },
    {
      title: i18n.balaceTransfer31,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{MathDiv(Number(row.amount), 1)}</span>
      }
    },
    {
      title: i18n.balaceTransfer32,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <span style={{ color: row.status === 'success' ? '#47cb89' : '#ed4014' }}>
            {row.status === 'success' ? i18n.balaceTransfer33 : i18n.balaceTransfer34}
          </span>
        )
      }
    },
    {
      title: i18n.balaceTransfer35,
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: i18n.balaceTransfer36,
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: i18n.balaceTransfer37,
      align: 'center',
      minWidth: 100,
      key: 'memo'
    }
  ]
}
