import { Button, Poptip, Tag } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('serviceSet')
  return [
    {
      title: i18n.serviceSet67,
      align: 'center',
      key: 'nickname',
      minWidth: 70
    },
    {
      title: i18n.serviceSet68,
      align: 'center',
      key: 'account'
    },
    {
      title: i18n.serviceSet69,
      align: 'center',
      key: 'createTime'
    },
    {
      title: i18n.serviceSet70,
      align: 'center',
      key: 'channel',
      render(h, { row }) {
        return (
          <Tag color={row.state ? 'default' : 'success'} type="dot">
            {row.state ? i18n.serviceSet71 : i18n.serviceSet72}
          </Tag>
        )
      }
    },
    {
      title: i18n.serviceSet73,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return (
          <div>
            <Poptip
              confirm
              title={`${i18n.serviceSet63}${row.state ? i18n.serviceSet72 : i18n.serviceSet71}${row.nickname}${i18n.serviceSet64}`}
              on-on-ok={_ => Vue.handleStatus(row)}
            >
              <Button type={row.state ? 'success' : 'error'} size="small">
                {row.state ? i18n.serviceSet72 : i18n.serviceSet71}
              </Button>
            </Poptip>

            <Button
              type="primary"
              size="small"
              style="margin-left:5px"
              on-click={_ => Vue.handleEdit(row)}
            >
              {i18n.serviceSet74}
            </Button>
          </div>
        )
      }
    }
  ]
}
