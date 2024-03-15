import { Button, Poptip, Tag } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('appManagement');
  return [
    {
      title: i18n.appManagement13,
      align: 'center',
      key: 'type_name'
    },
    {
      title: i18n.appManagement14,
      align: 'center',
      key: 'name'
    },
    {
      title: `${i18n.appManagement29}`,
      align: 'center',
      key: 'version'
    },
    {
      title: i18n.appManagement15,
      align: 'center',
      key: 'bag_url'
    },
    {
      title: `ICON`,
      align: 'center',
      key: 'icon_url',
      render(h, { row }) {
        return row.icon_url ? <img src={row.icon_url} style="width: 100px;height: auto;"/> : <span>--</span>
      }
    },
    {
      title: `${i18n.appManagement30}`,
      align: 'center',
      key: 'icon_url'
    },
    {
      title: i18n.appManagement16,
      align: 'center',
      key: 'created'
    },
    {
      title: `${i18n.appManagement31}`,
      align: 'center',
      render(h, { row }) {
        return (
          <Tag color={row.status === 1 ? 'default' : 'success'} type='dot'>
            {row.status === 1 ? `${i18n.appManagement25}` : `${i18n.appManagement24}`}
          </Tag>
        )
      }
    },
    {
      title: i18n.appManagement17,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Poptip
              confirm
              title={row.status === 1 ? `${i18n.appManagement32}` : `${i18n.appManagement33}`}
              on-on-ok={_ => Vue.upDataStatus(row)}
            >
              <Button type={row.status === 1 ? `success` : `error`} size='small'>{row.status === 1 ? `${i18n.appManagement24}` : `${i18n.appManagement25}`}</Button>
            </Poptip>
            <Button type='primary' size='small' on-click={_ => Vue.compile(row)} style="margin-left: 5px;">{i18n.appManagement34}</Button>
            <Button type='error' size='small' on-click={_ => Vue.deleteBtn(row)} style="margin-left: 5px;">{i18n.appManagement18}</Button>
          </div>
        )
      }
    }
  ]
}
