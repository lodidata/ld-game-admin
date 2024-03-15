import { Button, Tag, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('adminList')
  return [
    {
      title: i18n.adminList30,
      align: 'center',
      key: 'username',
      minWidth: 100
    },
    {
      title: i18n.adminList31,
      align: 'center',
      key: 'truename',
      minWidth: 100
    },
    {
      title: i18n.adminList32,
      align: 'center',
      key: 'part',
      minWidth: 100
    },
    {
      title: i18n.adminList33,
      align: 'center',
      key: 'job',
      minWidth: 100
    },
    {
      title: i18n.adminList34,
      align: 'center',
      key: 'role',
      minWidth: 100
    },
    {
      title: i18n.adminList35,
      align: 'center',
      key: 'loginip',
      minWidth: 100
    },
    {
      title: i18n.adminList36,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <div>
            {row.logintime ? row.logintime.split(' ').map((x, i) => <p key={i}>{x}</p>) : '-'}
          </div>
        )
      }
    },
    {
      title: i18n.adminList37,
      align: 'center',
      key: 'status',
      render(h, { row }) {
        return (
          <Tag color={row.status === 1 ? 'success' : 'default'} type='dot'>
            {row.status === 1 ? i18n.adminList38 : i18n.adminList39}
          </Tag>
        )
      },
      minWidth: 100
    },
    {
      title: i18n.adminList40,
      align: 'center',
      minWidth: 180,
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.adminList41}
            </Button>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleChangePw(row)}
            >
              {i18n.adminList42}
            </Button>
            <Poptip
              confirm
              title={`${i18n.adminList43}${row.status === 1 ? i18n.adminList39 : i18n.adminList38} ${row.username} ?`}
              on-on-ok={_ => Vue.handleStop(row)}
            >
              <Button
                type={row.status === 1 ? 'error' : 'success'}
                size='small'
                style='margin-right:5px'
              >
                {row.status === 1 ? i18n.adminList39 : i18n.adminList38}
              </Button>
            </Poptip>
            <Poptip
              confirm
              title={`${i18n.adminList44} ${row.username} ?`}
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button type='error' size='small' style='margin-right:5px'>
                {i18n.adminList45}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
