import { Button, Tag, Poptip } from 'iview'

// 状态的标签颜色
const formatStateColor = v => {
  return {
    '0': '#ff4949',
    '1': '#13ce66'
  }[v]
}

export default function(Vue) {
  const i18n = Vue.$t('receivableBank')
  // 状态
  const formatState = v => {
    return {
      '0': i18n.receivableBank92,
      '1': i18n.receivableBank93
    }[v]
  }
  return [
    {
      title: i18n.receivableBank53,
      align: 'center',
      minWidth: 100,
      key: 'type_name'
    },
    {
      title: i18n.receivableBank54,
      align: 'center',
      minWidth: 100,
      key: 'type_name',
      render(h, { row }) {
        return (
          <Tag color={row.show == 'online' ? 'success' : 'primary'}>
            {row.show == 'online' ? i18n.receivableBank55 : i18n.receivableBank56}
          </Tag>
        )
      }
    },
    {
      title: i18n.receivableBank57,
      align: 'center',
      minWidth: 100,
      key: 'title'
    },
    {
      title: i18n.receivableBank58,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <Tag type='dot' color={formatStateColor(row.status)}>
            {formatState(row.status)}
          </Tag>
        )
      }
    },
    {
      title: i18n.receivableBank59,
      align: 'center',
      minWidth: 140,
      myExt: {
        label: 'handle'
      },
      render(h, { row }) {
        return (
          <div>
            <Poptip
              confirm
              title={`${i18n.receivableBank60}${row.status === 1 ? i18n.receivableBank61 : i18n.receivableBank62}${i18n.receivableBank63}？`}
              on-on-ok={_ => Vue.handleStatus(row)}
            >
              <Button
                type={row.status === 1 ? 'error' : 'success'}
                size='small'
                style='margin-left:5px'
              >
                {row.status === 1 ? i18n.receivableBank61 : i18n.receivableBank62}
              </Button>
            </Poptip>
            <Button
              type='primary'
              size='small'
              style='margin-left:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.receivableBank64}
            </Button>
          </div>
        )
      }
    }
  ]
}
