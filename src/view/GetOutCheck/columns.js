import { Button, Poptip } from 'iview'

export const dataList = function(Vue){
  const i18n = Vue.$t('getOutCheck')
  const formatStatus = v =>
    ({
      paid: i18n.getOutCheck90,
      pending: i18n.getOutCheck91,
      rejected: i18n.getOutCheck92,
      canceled: i18n.getOutCheck93,
      confiscate: i18n.getOutCheck123,
      obligation: i18n.getOutCheck136,
      lock: i18n.getOutCheck137,
      oblock: i18n.getOutCheck137
    }[v])
  return [
    {
      type: 'selection',
      width: 30,
      title: '',
      fixed: 'left',
      align: 'center',
      myExt: {
        label: 'selection'
      }
    },
    {
      title: i18n.getOutCheck64,
      align: 'center',
      minWidth: 80,
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.getOutCheck65 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      },
      myExt: {
        label: 'username'
      }
    },
    {
      title: i18n.getOutCheck66,
      align: 'center',
      minWidth: 70,
      key: 'origin_str',
      myExt: {
        label: 'origin_str'
      }
    },
    {
      title: i18n.getOutCheck67,
      align: 'center',
      minWidth: 70,
      key: 'tags',
      myExt: {
        label: 'tags'
      }
    },
    {
      title: i18n.getOutCheck117,
      align: 'center',
      minWidth: 70,
      key: 'total_cz',
      myExt: {
        label: 'total_cz'
      }
    },
    {
      title: i18n.getOutCheck118,
      align: 'center',
      minWidth: 70,
      key: 'total_dh',
      myExt: {
        label: 'total_dh'
      }
    },
    {
      title: i18n.getOutCheck119,
      align: 'center',
      minWidth: 70,
      key: 'today_tz',
      myExt: {
        label: 'today_tz'
      }
    },
    {
      title: i18n.getOutCheck120,
      align: 'center',
      minWidth: 70,
      key: 'total_tz',
      myExt: {
        label: 'total_tz'
      }
    },
    {
      title: i18n.getOutCheck121,
      align: 'center',
      minWidth: 70,
      key: 'today_cj',
      myExt: {
        label: 'today_cj'
      }
    },
    {
      title: i18n.getOutCheck122,
      align: 'center',
      minWidth: 70,
      key: 'total_cj',
      myExt: {
        label: 'total_cj'
      }
    },
    {
      title: i18n.getOutCheck68,
      align: 'center',
      minWidth: 120,
      key: 'trade_no',
      myExt: {
        label: 'trade_no'
      }
    },
    {
      title: i18n.getOutCheck69,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <p>{row.receive_bank_info.bank || '-'}</p>
          </div>
        )
      },
      minWidth: 70,
      myExt: {
        label: 'receive_bank_info'
      }
    },
    {
      title: i18n.getOutCheck70,
      align: 'center',
      minWidth: 60,
      render(h, { row }) {
        return (
          <div>
            <p>{row.receive_bank_info.name || '-'}</p>
          </div>
        )
      },
      myExt: {
        label: 'receive_bank_name'
      }
    },
    {
      title: i18n.getOutCheck71,
      minWidth: 130,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.receive_bank_info ? (
              <div>
                <p>{row.receive_bank_info.card || '-'}</p>
              </div>
            ) : (
              '-'
            )}
          </div>
        )
      },
      myExt: {
        label: 'pay_bank_card'
      }
    },
    {
      title: i18n.getOutCheck72,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span class='red'>{row.money}</span>
      },
      myExt: {
        label: 'money'
      }
    },
    {
      title: i18n.getOutCheck73,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <div>{row.created ? row.created.split(' ').map((x, i) => <p>{x}</p>) : '-'}</div>
      },
      myExt: {
        label: 'created'
      }
    },
    {
      title: i18n.getOutCheck74,
      align: 'center',
      minWidth: 150,
      render(h, { row }) {
        return (
          <p>
            {row.ip}(
            <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.getOutCheck65 ? 'red' : 'user_link'} on-click={_ => Vue.handleCheck(row)}>
              {i18n.getOutCheck75}
            </span>
            )
          </p>
        )
      },
      myExt: {
        label: 'ip'
      }
    },
    {
      title: i18n.getOutCheck76,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return (
          <span class={row.is_new === 'yes' ? 'success' : 'red'}>
            {row.is_new === 'yes' ? i18n.getOutCheck77 : i18n.getOutCheck78}
          </span>
        )
      },
      myExt: {
        label: 'coupon_money'
      }
    },
    {
      title: i18n.getOutCheck125,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return (
          <span>
            {row.type == 1 ? i18n.getOutCheck126 : i18n.getOutCheck127}
          </span>
        )
      },
      myExt: {
        label: 'type'
      }
    },
    {
      title: i18n.getOutCheck79,
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
      title: i18n.getOutCheck115,
      align: 'center',
      minWidth: 120,
      key: 'third_no',
      myExt: {
        label: 'third_no'
      }
    },
    {
      title: i18n.getOutCheck116,
      align: 'center',
      minWidth: 70,
      key: 'third_type',
      myExt: {
        label: 'third_type'
      }
    },
    {
      title: i18n.getOutCheck80,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.admin_user ? row.admin_user : '-'}</span>
      },
      myExt: {
        label: 'admin_user'
      }
    },
    {
      title: i18n.getOutCheck81,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <div>{row.updated ? row.updated.split(' ').map((x, i) => <p>{x}</p>) : '-'}</div>
      },
      myExt: {
        label: 'created'
      }
    },
    {
      title: `${i18n.getOutCheck129}`,//出款成功时间
      minWidth: 140,
      align: 'center',
      render(h, { row }) {
        return <span>{ row.status == 'paid' ? row.confirm_time : '' }</span>
      },
      myExt: {
        label: 'confirm_time'
      }
    },
    {
      title: i18n.getOutCheck82,
      minWidth: 140,
      align: 'center',
      render(h, { row }) {
        return <span>{row.memo || i18n.getOutCheck83}</span>
      },
      myExt: {
        label: 'memo'
      }
    },
    {
      title: i18n.getOutCheck84,
      align: 'center',
      minWidth: 220,
      render(h, { row }) {
        return row.status === 'pending' ? (
          <div>
            <Button
              type='success'
              size='small'
              style='margin-left:5px'
              on-click={_ => Vue.handleSuc(row, 'obligation')}
            >
              {i18n.getOutCheck146}
            </Button>
            <Button
              type='error'
              size='small'
              style='margin-left:5px'
              on-click={_ => Vue.handleRefuse(row, 'rejected')}
            >
              {i18n.getOutCheck88}
            </Button>
            <Button
              type='warning'
              size='small'
              style='margin-left:5px'
              on-click={_ => Vue.handleRefuse(row, 'lock')}
            >{i18n.getOutCheck147}</Button>
            <Button
              type='primary'
              size='small'
              style='margin-left:5px;margin-top:5px'
              on-click={_ => Vue.handleRefuse(row, 'confiscate')}
            >{i18n.getOutCheck123}</Button>
          </div>
        ) : row.status === 'obligation' ? (
          <div>
            <Button
              type='primary'
              size='small'
              on-click={_ => Vue.handlePay(row)}
            >
              {i18n.getOutCheck85}
            </Button>
            <Button type='success' size='small' style='margin-left:5px'
              on-click={_ => Vue.handleRefuse(row, 'paid')}
            >
              {i18n.getOutCheck87}
            </Button>
            <Button
              type='error'
              size='small'
              style='margin-left:5px'
              on-click={_ => Vue.handleRefuse(row, 'rejected')}
            >
              {i18n.getOutCheck88}
            </Button>
            <Button
              type='warning'
              size='small'
              style='margin-left:5px'
              on-click={_ => Vue.handleRefuse(row, 'oblock')}
            >{i18n.getOutCheck147}</Button>
            <Button
              type='primary'
              size='small'
              style='margin-left:5px;margin-top:5px'
              on-click={_ => Vue.handleRefuse(row, 'confiscate')}
            >{i18n.getOutCheck123}</Button>
          </div>
        ) : row.status === 'lock' ? (
          <div>
            <Poptip confirm title={`${i18n.getOutCheck148}`} on-on-ok={_ => Vue.handleSuc(row, 'unlock')}>
              <Button type='success' size='small' style='margin-left:5px'>
                {i18n.getOutCheck149}
              </Button>
            </Poptip>
          </div>
        ) : row.status === 'oblock' ? (
          <div>
            <Poptip confirm title={`${i18n.getOutCheck148}`} on-on-ok={_ => Vue.handleSuc(row, 'obunlock')}>
              <Button type='success' size='small' style='margin-left:5px'>
                {i18n.getOutCheck149}
              </Button>
            </Poptip>
          </div>
        ) : row.status === 'transfer' ? (
          <p>{i18n.getOutCheck89}</p>
        ) : (
          <p>-</p>
        )
      },
      myExt: {
        label: 'handle'
      }
    }
  ]
}

// <Poptip confirm title={`${i18n.getOutCheck86}`} on-on-ok={_ => Vue.handleSuc(row, 'paid')}>
//   <Button type='success' size='small' style='margin-left:5px'>
//     {i18n.getOutCheck87}
//   </Button>
// </Poptip>

// <Poptip confirm title={`${i18n.getOutCheck124}`} on-on-ok={_ => Vue.handleSuc(row, 'confiscate')}>
//   <Button type='primary' size='small' style='margin-left:5px;margin-top:5px'>{i18n.getOutCheck123}</Button>
// </Poptip>

// <Poptip confirm title={`${i18n.getOutCheck145}`} on-on-ok={_ => Vue.handleSuc(row, 'obligation')}>
//   <Button type='success' size='small' style='margin-left:5px'>
//     {i18n.getOutCheck146}
//   </Button>
// </Poptip>

// <Button
//               type='warning'
//               size='small'
//               style='margin-left:5px'
//               on-click={_ => Vue.handleRefuse(row, 'oblock')}
//             >{i18n.getOutCheck147}</Button>

export const payList = function(Vue){
  const i18n = Vue.$t('getOutCheck')
  return [
    {
      title: `${i18n.getOutCheck64}`,//用户名
      align: 'center',
      minWidth: 70,
      key: 'user_name'
    },
    {
      title: `${i18n.getOutCheck28}`,//收款人姓名
      align: 'center',
      minWidth: 70,
      key: 'name'
    },
    {
      title: `${i18n.getOutCheck29}`,//收款银行
      align: 'center',
      minWidth: 70,
      key: 'bank_code'
    },
    {
      title: `${i18n.getOutCheck30}`,//收款账号
      align: 'center',
      minWidth: 70,
      key: 'card'
    },
    {
      title: `${i18n.getOutCheck31}`,//所属支行
      align: 'center',
      minWidth: 70,
      key: 'address'
    },
    {
      title: `${i18n.getOutCheck32}`,//转账金额
      align: 'center',
      minWidth: 70,
      key: 'money'
    }
  ]
}
