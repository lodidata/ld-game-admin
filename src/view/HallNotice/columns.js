import { Button } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('hallNotice')
  return [
    {
      title: i18n.hallNotice4,
      align: 'center',
      minWidth: 80,
      key: 'id'
    },
    {
      title: i18n.hallNotice5,
      align: 'center',
      minWidth: 80,
      key: 'menu_name'
    },
    {
      title: i18n.hallNotice6,
      align: 'center',
      minWidth: 100,
      key: 'game_name'
    },
    {
      title: i18n.hallNotice7,
      align: 'center',
      minWidth: 80,
      key: 'pub_time'
    },
    {
      title: i18n.hallNotice8,
      align: 'center',
      minWidth: 100,
      key: 'title'
    },
    {
      title: i18n.hallNotice9,
      align: 'center',
      minWidth: 80,
      key: 'start_time'
    },
    {
      title: i18n.hallNotice10,
      align: 'center',
      minWidth: 80,
      key: 'end_time'
    },
    {
      title: i18n.hallNotice11,
      align: 'center',
      minWidth: 120,
      render(h, { row }) {
        return (
          <Button
            type='primary'
            size='small'
            style='margin-right:5px'
            on-click={_ => Vue.handleOpenModal(row)}
          >
            {i18n.hallNotice12}
          </Button>
        )
      }
    }
  ]
}
