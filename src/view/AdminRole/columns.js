import { Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('adminRole')
  return [
    {
      title: i18n.adminRole17,
      key: 'role',
      align: 'center'
    },
    {
      title: i18n.adminRole18,
      key: 'num',
      align: 'center',
      sortable: true
    },
    {
      title: i18n.adminRole19,
      key: 'addtime',
      align: 'center'
    },
    {
      title: i18n.adminRole20,
      key: 'username',
      align: 'center'
    },
    {
      title: i18n.adminRole21,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              size='small'
              type='primary'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.adminRole22}
            </Button>
            <Poptip confirm title={`${i18n.adminRole23} ${row.role} ?`} on-on-ok={_ => Vue.handleDetele(row)}>
              <Button size='small' type='error'>
                {i18n.adminRole24}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
