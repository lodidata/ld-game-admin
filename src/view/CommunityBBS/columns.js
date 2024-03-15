import { Tag, Button, Poptip } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('CommunityBBS')
  return [
    {
      title: i18n.CommunityBBS10,
      key: 'name',
      minWidth: 120,
      align: 'center',
    },
    {
      title: i18n.CommunityBBS24,
      key: 'name',
      minWidth: 120,
      align: 'center',
      render(h, { row }) {
        return <img src={row.icon} class='thumb' />
      }
    },
    {
      title: i18n.CommunityBBS11,
      key: 'jump_url',
      minWidth: 120,
      align: 'center',
    },
    {
      title: i18n.CommunityBBS12,
      key: 'status',
      minWidth: 120,
      align: 'center',
      render(h, { row }) {
        return (
          <Tag type='dot' color={row.status === 0 ? 'success' : 'default'}>
            {row.status === 0 ? i18n.CommunityBBS13 : i18n.CommunityBBS14}
          </Tag>
        )
      }
    },
    {
      title: i18n.CommunityBBS15,
      key: 'created',
      minWidth: 120,
      align: 'center',
    },
    {
      title: i18n.CommunityBBS16,
      minWidth: 150,
      align: 'center',
      render(h, { row }) {
        return (
        <div>
          <Poptip
          confirm
          title={`${i18n.CommunityBBS23}${row.status === 0 ? i18n.CommunityBBS17  : i18n.CommunityBBS18}`}
          on-on-ok={_ => Vue.amendStatus(row)}
          >
            <Button
            type={row.status === 0 ? 'error' : 'success'}
            size='small'
            style='margin-right:5px'
            >
              {row.status === 0 ? i18n.CommunityBBS17  : i18n.CommunityBBS18}
            </Button>
          </Poptip>
          <Button
            type='primary'
            size='small'
            style='margin-right:5px'
            on-click={_ => Vue.compileList(row)}
          >
            {i18n.CommunityBBS19}
          </Button>
          <Poptip
          confirm
          title={i18n.CommunityBBS20}
          on-on-ok={_ => Vue.deleteList(row)}
          >
            <Button
            type="error"
            size='small'
            >
              {i18n.CommunityBBS21}
            </Button>
          </Poptip>
        </div>
        )
      }
    }
  ]
}
