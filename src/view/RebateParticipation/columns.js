import { Button } from 'iview'
export default function(Vue) {
  const i18n_lang = Vue.$t('RebateParticipation')
  return [
    {
      title: `${i18n_lang.RebateParticipation9}`,
      align: 'center',
      minWidth: 150,
      key: 'name'
    },
    {
      title: `${i18n_lang.RebateParticipation10}`,
      align: 'center',
      minWidth: 150,
      key: 'ratio',
      render(h, { row }) {
        return <span>{row.ratio ? `${row.ratio}%` : ''}</span>
      }
    },
    {
      title: `${i18n_lang.RebateParticipation11}`,
      align: 'center',
      minWidth: 150,
      key: 'is_take',
      render(h, { row }) {
        return <span>{row.is_take ? `${i18n_lang.RebateParticipation12}` : `${i18n_lang.RebateParticipation13}`}</span>
      }
    },
    {
      title: `${i18n_lang.RebateParticipation14}`,
      minWidth: 180,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              on-click={_ => Vue.handleList(row)}
            >
            {`${i18n_lang.RebateParticipation15}`}
            </Button>
          </div>
        )
      }
    }
  ]
}
