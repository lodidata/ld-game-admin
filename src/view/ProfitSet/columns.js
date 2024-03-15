import { Button, Poptip, Tag } from 'iview'
export default function(Vue) {
  const i18n_lang = Vue.$t('ProfitSet')
  return [
    {
      title: `${i18n_lang.ProfitSet25}`,
      align: 'center',
      minWidth: 150,
      key: 'name'
    },
    {
      title: `${i18n_lang.ProfitSet26}`,
      align: 'center',
      minWidth: 100,
      key: 'type_text'
    },
    {
      title: `${i18n_lang.ProfitSet37}`,
      align: 'center',
      minWidth: 100,
      key: 'rename'
    },
    {
      title: `${i18n_lang.ProfitSet27}`,
      align: 'center',
      minWidth: 100,
      key: 'proportion_value',
      render(h, { row }) {
        return <span>{row.proportion_value ? `${row.proportion_value}%` : ''}</span>
      }
    },
    {
      title: `${i18n_lang.ProfitSet28}`,
      align: 'center',
      minWidth: 100,
      key: 'settle_status',
      render(h, { row }) {
        return <span>{row.settle_status == 1 ? `${i18n_lang.ProfitSet29}` : `${i18n_lang.ProfitSet30}`}</span>
      }
    },
    {
      title: `${i18n_lang.ProfitSet31}`,
      align: 'center',
      minWidth: 100,
      key: 'part_value',
      render(h, { row }) {
        return <span>{row.part_value ? `${row.part_value}%` : ''}</span>
      }
    },
    {
      title: `${i18n_lang.ProfitSet32}`,
      align: 'center',
      minWidth: 110,
      render(h, { row }) {
        return (
          <Tag color={row.status === 2 ? 'default' : 'success'} type='dot'>
            {row.status === 2 ? `${i18n_lang.ProfitSet33}` : `${i18n_lang.ProfitSet34}`}
          </Tag>
        )
      }
    },
    {
      title: `${i18n_lang.ProfitSet35}`,
      minWidth: 180,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
            {`${i18n_lang.ProfitSet36}`}
            </Button>
          </div>
        )
      }
    }
  ]
}
