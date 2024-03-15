import { Button } from 'iview'
export default function(Vue) {
  const i18n_lang = Vue.$t('RebateSet')
  return [
    {
      title: `${i18n_lang.RebateSet16}`,
      align: 'center',
      minWidth: 150,
      key: 'name'
    },
    {
      title: `${i18n_lang.RebateSet17}`,
      align: 'center',
      minWidth: 150,
      key: 'type_text'
    },
    {
      title: `${i18n_lang.RebateSet18}`,
      align: 'center',
      minWidth: 150,
      key: 'proportion_value',
      render(h, { row }) {
        return <span>{row.proportion_value ? `${row.proportion_value}%` : ''}</span>
      }
    },
    {
      title: `${i18n_lang.RebateSet19}`,
      align: 'center',
      minWidth: 150,
      key: 'settle_status',
      render(h, { row }) {
        return <span>{row.settle_status == 1 ? `${i18n_lang.RebateSet20}` : `${i18n_lang.RebateSet21}`}</span>
      }
    },
    {
      title: `${i18n_lang.RebateSet22}`,
      align: 'center',
      minWidth: 150,
      key: 'part_value',
      render(h, { row }) {
        return <span>{row.part_value ? `${row.part_value}%` : ''}</span>
      }
    },
    {
      title: `${i18n_lang.RebateSet23}`,
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
            {`${i18n_lang.RebateSet24}`}
            </Button>
          </div>
        )
      }
    }
  ]
}
