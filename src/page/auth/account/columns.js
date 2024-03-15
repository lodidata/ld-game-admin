import { Button, Tag, Poptip } from 'iview'

export default function (Vue) {
  const i18n = Vue.$t('accountList')
  return [
    {
      title: i18n.accountList18,
      align: 'center',
      type: 'index',
      minWidth: 100
    },
    {
      title: i18n.accountList19 + "ID",
      align: 'center',
      key: 'account_id',
      minWidth: 100
    },
    {
      title: i18n.accountList19,
      align: 'username',
      key: 'name',
      minWidth: 100
    },
    {
      title:  i18n.accountList20,
      align: 'center',
      key: 'name',
      minWidth: 100
    },
    {
      title: i18n.accountList21,
      align: 'center',
      key: 'group_name',
      minWidth: 100
    },
    {
      title:  i18n.accountList22,
      align: 'center',
      key: 'loginip',
      minWidth: 100
    },
    {
      title: i18n.accountList23,
      align: 'center',
      key: 'logintime',
      minWidth: 100
    },
    {
      title: i18n.accountList24,
      align: 'center',
      key: 'status',
      render(h, { row }) {
        return (

          <div>
            {Vue.type === 1 ? <Poptip
              confirm
              title={`${row.status == 1 ? i18n.accountList25 : i18n.accountList26}`}
              on-on-ok={_ => Vue.handleStop(row)}
            >
              
              <Button
                type={row.status === 0 ? 'error' : 'success'}
                size='small'
                v-btn={520}
                style='margin-right:5px'
              >
                {row.status === 0 ? i18n.accountList5 : i18n.accountList4}
              </Button>
            </Poptip> : <Button
              type={row.status === 0 ? 'error' : 'success'}
              size='small'
              v-btn={520}
              style='margin-right:5px'
            >
                {row.status === 0 ? i18n.accountList5 : i18n.accountList4}
            </Button>}
          </div>

        )
      },
      minWidth: 100
    },
    {
      title: i18n.accountList27,
      align: 'center',
      minWidth: 180,
      render(h, { row }) {
        return (
          <div>

            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              v-auth={521}
              on-click={_ => Vue.handleOpenModal('edit', row.id)}
            >
              {i18n.accountList34}
            </Button>
            {
              row.status === 0 && Vue.type === 1 ? <Button
                type='primary'
                size='small'
                v-auth={524}
                style='margin-right:5px'
                on-click={_ => Vue.handleDelete(row)}
              >
                {i18n.accountList31}
              </Button> : ''
            }
          </div>
        )
      }
    }
  ]
}