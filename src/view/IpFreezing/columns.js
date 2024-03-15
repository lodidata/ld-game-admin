import { Button, Poptip } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('ipFreezing')
  return [
    {
      title: `${i18n.ipFreezing19}`,//冻结IP
      align: 'center',
      key: 'ip',
      minWidth: 100
    },
    {
      title: `${i18n.ipFreezing20}`,//冻结账号
      align: 'center',
      key: 'accounts_num',
      minWidth: 100
    },
    {
      title: `${i18n.ipFreezing21}`,//冻结时间
      align: 'center',
      key: 'created',
      minWidth: 100
    },
    {
      title: `${i18n.ipFreezing29}`,//解除冻结时间
      align: 'center',
      key: 'valid_time',
      minWidth: 100
    },
    {
      title: `${i18n.ipFreezing22}`,//冻结原因
      align: 'center',
      key: 'memo',
      minWidth: 100
    },
    {
      title: `${i18n.ipFreezing23}`,//操作者
      align: 'center',
      key: 'operator',
      minWidth: 100
    },
    {
      title: `${i18n.ipFreezing24}`,//操作
      align: 'center',
      minWidth: 180,
      render(h, { row }) {
        return (
        <div>
          <Poptip
            confirm
            title={`${i18n.ipFreezing25}？`}
            on-on-ok={_ => Vue.handleDelete(row)}
          >
            <Button type='error' size='small'>
              {`${i18n.ipFreezing26}`}
            </Button>
          </Poptip>
        </div>
        )
      }
    }
  ]
}
