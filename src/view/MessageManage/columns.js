import { Button, Poptip, Tag } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('messageManage')
  return [
    {
      title: i18n.messageManage20,
      key: 'title',
      align: 'center',
      minWidth: 150,
      myExt: {
        label: 'title'
      }
    },
    {
      title: i18n.messageManage21,
      align: 'center',
      minWidth: 250,
      render: (h, { row }) =>
        h('div', {
          domProps: {
            innerHTML: row.content
          }
        }),
      myExt: {
        label: 'content'
      }
    },
    {
      title: i18n.messageManage22,
      key: 'admin_name',
      align: 'center',
      minWidth: 90,
      myExt: {
        label: 'admin_name'
      }
    },
    {
      title: i18n.messageManage23,
      key: 'recipient',
      align: 'center',
      minWidth: 200,
      myExt: {
        label: 'recipient'
      }
    },
    {
      title: i18n.messageManage24,
      minWidth: 110,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p>{x}</p>
            ))}
          </div>
        )
      },
      myExt: {
        label: 'created'
      }
    },
    {
      title: i18n.messageManage25,
      minWidth: 110,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.updated.split(' ').map((x, i) => (
              <p>{x}</p>
            ))}
          </div>
        )
      },
      myExt: {
        label: 'updated'
      }
    },
    {
      title: i18n.messageManage26,
      minWidth: 110,
      align: 'center',
      render(h, { row }) {
        return (
          <Tag color={row.status === 0 ? 'default' : 'success'} type='dot'>
            {row.status === 0 ? i18n.messageManage27 : i18n.messageManage28}
          </Tag>
        )
      },
      myExt: {
        label: 'status'
      }
    },
    {
      title: i18n.messageManage29,
      minWidth: 110,
      align: 'center',
      render(h, { row }) {
        return row.status === 0 ? (
          <div>
            <Poptip
              confirm
              title={`${i18n.messageManage30} ?`}
              on-on-ok={_ => Vue.handleHandle(row, 'public')}
            >
              <Button size='small' type='success'>
                {i18n.messageManage31}
              </Button>
            </Poptip>
            <Poptip
              confirm
              title={`${i18n.messageManage32} ?`}
              on-on-ok={_ => Vue.handleHandle(row, 'delete')}
            >
              <Button type='error' size='small' style='margin-left:5px'>
                {i18n.messageManage33}
              </Button>
            </Poptip>
          </div>
        ) : (
          <span>-</span>
        )
      },
      myExt: {
        label: 'handle'
      }
    }
  ]
}
