import { formatType } from './format'
import { Button, Poptip, Tag } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('activeList')
  return [
    {
      title: i18n.activeList201,
      align: 'center',
      minWidth: 100,
      key: 'type_name'
    },
    {
      title: i18n.activeList202,
      align: 'center',
      minWidth: 150,
      key: 'title'
    },
    {
      title: i18n.activeList203,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.template_name}</span>//formatType(row.template_id)
      }
    },
    {
      title: i18n.activeList204,
      align: 'center',
      minWidth: 250,
      render(h, { row }) {
        return (
          <span>
            {row.begin_time}-{row.end_time}
          </span>
        )
      }
    },
    {
      title: i18n.activeList205,
      align: 'center',
      minWidth: 100,
      key: 'sort'
    },
    {
      title: i18n.activeList206,
      align: 'center',
      minWidth: 130,
      key: 'created'
    },
    {
      title: i18n.activeList207,
      align: 'center',
      minWidth: 110,
      render(h, { row }) {
        return (
          <Tag color={row.status === 'disabled' ? 'default' : 'success'} type='dot'>
            {row.status === 'disabled' ? i18n.activeList208 : i18n.activeList209}
          </Tag>
        )
      }
    },
    {
      title: i18n.activeList210,
      minWidth: 180,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type={row.status === 'enabled' ? 'error' : 'success'}
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleStop(row)}
            >
              {row.status === 'enabled' ? i18n.activeList208 : i18n.activeList209}
            </Button>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.activeList211}
            </Button>
            <Poptip confirm title={`${i18n.activeList213}?`} on-on-ok={_ => Vue.deleteAd(row)}>
              <Button type='error' size='small' style='margin-right:5px'>
              {i18n.activeList212}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
