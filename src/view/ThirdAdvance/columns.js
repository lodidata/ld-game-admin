import { Button, Poptip } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('thirdAdvance')
  const formatStatus = v =>
    ({
      paid: i18n.thirdAdvance51,
      pending: i18n.thirdAdvance52,
      failed: i18n.thirdAdvance53
    }[v])
  return [
    {
      title: i18n.thirdAdvance55,
      align: 'center',
      key: 'trade_no'
    },
    {
      title: i18n.thirdAdvance38,
      align: 'center',
      key: 'withdraw_order'
    },
    {
      title: i18n.thirdAdvance39,
      align: 'center',
      key: 'transfer_no'
    },
    {
      title: i18n.thirdAdvance40,
      align: 'center',
      key: 'third_name'
    },
    {
      title: i18n.thirdAdvance41,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      }
    },
    {
      title: i18n.thirdAdvance42,
      align: 'center',
      key: 'receive_user_name'
    },
    {
      title: i18n.thirdAdvance43,
      align: 'center',
      key: 'receive_bank'
    },
    {
      title: i18n.thirdAdvance44,
      align: 'center',
      key: 'receive_bank_area'
    },
    {
      title: i18n.thirdAdvance45,
      align: 'center',
      key: 'city_area'
    },
    {
      title: i18n.thirdAdvance46,
      align: 'center',
      key: 'receive_bank_card'
    },
    {
      title: i18n.thirdAdvance47,
      align: 'center',
      render(h, { row }) {
        return <span>{row.money}</span>
      }
    },
    {
      title: i18n.thirdAdvance48,
      align: 'center',
      render(h, { row }) {
        return <span>{row.real_money}</span>
      }
    },
    {
      title: i18n.thirdAdvance49,
      align: 'center',
      render(h, { row }) {
        return <span>{formatStatus(row.status)}</span>
      }
    },
    {
      title: i18n.thirdAdvance50,
      align: 'center',
      // key: 'remark',
      render(h, { row }) {
        return <span title={row.remark}>{ row.remark && row.remark.length >= 120 ? `${row.remark.substr(0, 120)}...` : row.remark}</span>
      }
    },
    {
      title: i18n.thirdAdvance62,
      align: 'center',
      render(h, { row }) {
        return row.status == 'pending' ? (
          <Button type="primary" size="small" on-click={_ => Vue.handle(row)}>{`${i18n.thirdAdvance58}`}</Button>
        ) : (
          <div>-</div>
        )
        // return row.status == 'pending' ? (
        //   <div>
        //     <Poptip confirm title={`确认请求查看此条数据吗？`} on-on-ok={_ => Vue.handleReq(row)}>
        //       <Button type="primary" size="small" style="margin-left:5px">
        //         请求查看
        //       </Button>
        //     </Poptip>
        //   </div>
        // ) : (
        //   <span>-</span>
        // );
      }
    }
  ]
}
