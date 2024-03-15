import { Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('payManage')
  const formatStatus = v =>
    ({
      paid: i18n.payManage152,
      pending: i18n.payManage153,
      rejected: i18n.payManage154,
      canceled: i18n.payManage155
    }[v])
  return [
    {
      title: i18n.payManage105,
      align: 'center',
      minWidth: 140,
      key: 'trade_no',
      myExt: {
        label: 'trade_no'
      }
    },
    {
      title: i18n.payManage106,
      align: 'center',
      minWidth: 80,
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.payManage107 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      },
      myExt: {
        label: 'username'
      }
    },
    {
      title: i18n.payManage108,
      align: 'center',
      minWidth: 70,
      key: 'origin_str',
      myExt: {
        label: 'origin_str'
      }
    },
    {
      title: i18n.payManage109,
      align: 'center',
      minWidth: 70,
      key: 'ranting_name',
      myExt: {
        label: 'ranting_name'
      }
    },
    {
      title: i18n.payManage110,
      key: 'pay_type',
      align: 'center',
      minWidth: 70,
      myExt: {
        label: 'pay_type'
      }
    },
    {
      title: i18n.payManage111,
      minWidth: 130,
      render(h, { row }) {
        return (
          <div>
            <p>
              {i18n.payManage112}
              {row.receive_bank_info.bank || '-'}
            </p>
            <p>
              {i18n.payManage113}
              {row.receive_bank_info.accountname || '-'}
            </p>
            <p>
              {i18n.payManage114}
              {row.receive_bank_info.card || '-'}
            </p>
          </div>
        )
      },
      myExt: {
        label: 'receive_bank_info'
      }
    },
    {
      title: i18n.payManage115,
      minWidth: 130,
      render(h, { row }) {
        return (
          <div>
            <p>
              {i18n.payManage112}
              {row.pay_bank_info.bank || '-'}
            </p>
            <p>
              {i18n.payManage113}
              {row.pay_bank_info.name || '-'}
            </p>
            <p>
              {i18n.payManage114}
              {row.pay_bank_info.card || '-'}
            </p>
          </div>
        )
      },
      myExt: {
        label: 'pay_bank_info'
      }
    },
    {
      title: i18n.payManage116,
      align: 'center',
      minWidth: 80,
      key: 'money',
      render(h, { row }) {
        return <span class='red'>{row.money}</span>
      },
      myExt: {
        label: 'money'
      },
      sortable: 'custom'
    },
    {
      title: i18n.payManage117,
      minWidth: 100,
      align: 'center',
      key: 'active_name',
      render(h, { row }) {
        return <span>{row.active_name || i18n.payManage118}</span>
      },
      myExt: {
        label: 'active_name'
      }
    },
    {
      title: i18n.payManage119,
      align: 'center',
      minWidth: 120,
      render(h, { row }) {
        return <span class='red'>{row.coupon_money}</span>
      },
      myExt: {
        label: 'coupon_money'
      }
    },
    {
      title: i18n.payManage120,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return row.created ? (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p>{x}</p>
            ))}
          </div>
        ) : (
          <span>-</span>
        )
      },
      myExt: {
        label: 'created'
      }
    },
    {
      title: i18n.payManage121,
      align: 'center',
      minWidth: 60,
      render(h, { row }) {
        return <span>{formatStatus(row.status)}</span>
      },
      myExt: {
        label: 'status'
      }
    },
    {
      title: i18n.payManage122,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span class='red'>{row.in_money}</span>
      },
      myExt: {
        label: 'in_money'
      }
    },
    {
      title: i18n.payManage123,
      align: 'center',
      minWidth: 80,
      key: 'process_uname',
      myExt: {
        label: 'process_uname'
      }
    },
    {
      title: i18n.payManage124,
      align: 'center',
      minWidth: 80,
      key: 'process_time',
      render(h, { row }) {
        return row.process_time ? (
          <div>
            {row.process_time.split(' ').map((x, i) => (
              <p>{x}</p>
            ))}
          </div>
        ) : (
          <span>-</span>
        )
      },
      myExt: {
        label: 'process_time'
      }
    },
    {
      title: i18n.payManage125,
      align: 'center',
      minWidth: 240,
      render(h, { row }) {
        return row.status === 'pending' ? (
          <div>
            <Button type='primary' size='small' on-click={_ => Vue.handleDetail(row)}>
              {i18n.payManage126}
            </Button>
            <Poptip confirm on-on-ok={_ => Vue.handlePass(row)}>
              <div slot="title">{i18n.payManage127}</div>
              <Button style='margin-left:5px' type='success' size='small'>
                {i18n.payManage128}
              </Button>
            </Poptip>
            {row.active_id ? (
              <Poptip
                confirm
                on-on-ok={_ => Vue.handlePass(row, true)}
              >
                <div slot="title">{i18n.payManage129}</div>
                <Button style='margin-left:5px' type='warning' size='small'>
                  {i18n.payManage130}
                </Button>
              </Poptip>
            ) : (
              ''
            )}

            <Button
              style='margin-left:5px'
              type='error'
              size='small'
              on-click={_ => Vue.handleRefuse(row)}
            >
              {i18n.payManage131}
            </Button>
          </div>
        ) : (
          <Button type='primary' size='small' on-click={_ => Vue.handleDetail(row)}>
            {i18n.payManage132}
          </Button>
        )
      },
      myExt: {
        label: 'handle'
      }
    },
    {
      title: i18n.payManage133,
      minWidth: 140,
      render(h, { row }) {
        return <span>{row.memo || i18n.payManage118}</span>
      },
      myExt: {
        label: 'memo'
      }
    }
  ]
}
