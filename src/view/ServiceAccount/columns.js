import { Button, Tag, Poptip } from 'iview'

export default function(Vue, type = 'qq') {
  const i18n = Vue.$t('serviceAccount')
  const firstCol = {
    title: type === 'qq' ? 'QQ' : i18n.serviceAccount21,
    align: 'center',
    minWidth: 80,
    key: 'account'
  }

  return [
    firstCol,
    {
      title: i18n.serviceAccount22,
      align: 'center',
      minWidth: 80,
      key: 'name'
    },
    {
      title: i18n.serviceAccount23,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <img src={row.avatar} class='thumb' />
      }
    },
    {
      title: i18n.serviceAccount24,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return (
          <Tag type='dot' color={row.status === 1 ? 'success' : 'default'}>
            {row.status === 1 ? i18n.serviceAccount25 : i18n.serviceAccount26}
          </Tag>
        )
      }
    },
    {
      title: i18n.serviceAccount27,
      minWidth: 140,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(type, row)}
            >
              {i18n.serviceAccount28}
            </Button>
            <Poptip
              confirm
              title={`${i18n.serviceAccount31}${row.status === 1 ? i18n.serviceAccount26 : i18n.serviceAccount25} ${row.name} ?`}
              on-on-ok={_ => Vue.handleStop(type, row)}
            >
              <Button
                type={row.status === 1 ? 'error' : 'success'}
                size='small'
                style='margin-right:5px'
              >
                {row.status === 1 ? i18n.serviceAccount26 : i18n.serviceAccount25}
              </Button>
            </Poptip>
            <Poptip
              confirm
              title={`${i18n.serviceAccount29} ${row.name} ?`}
              on-on-ok={_ => Vue.deleteServicer(type, row)}
            >
              <Button type='error' size='small' style='margin-right:5px'>
                {i18n.serviceAccount30}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
