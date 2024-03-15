import { Button } from 'iview'
export default function(Vue) {
  const i18n_lang = Vue.$t('joinList')
  return [
    {
      title: `${i18n_lang.joinList61}`,//用户名
      align: 'center',
      minWidth: 100,
      key: 'user_name',
      render(h, { row }) {
        return <span on-click={_ => Vue.handleUserDetail(row)} style="color: #2d8cf0;cursor: pointer;">{row.user_name}</span>
      }
    },
    {
      title: `${i18n_lang.joinList62}`,//申请时间
      align: 'center',
      minWidth: 100,
      key: 'apply_time'
    },
    {
      title: `${i18n_lang.joinList63}`,//申请活动名称
      align: 'center',
      minWidth: 100,
      key: 'active_name'
    },
    {
      title: `${i18n_lang.joinList64}`,//活动类型
      align: 'center',
      minWidth: 100,
      key: 'active_type_id_name'
    },
    {
      title: `${i18n_lang.joinList65}`,//活动起止时间
      align: 'center',
      minWidth: 100,
      key: 'begin_time',
      render(h, { row }) {
        return <span>{`${row.begin_time}-${row.end_time}`}</span>
      }
    },
    {
      title: `${i18n_lang.joinList66}`,//用户申请理由
      align: 'center',
      minWidth: 100,
      key: 'reason'
    },
    {
      title: `${i18n_lang.joinList67}`,//用户申请凭证
      align: 'center',
      minWidth: 100,
      key: 'apply_pic',
      render(h, { row }) {
        return row.apply_pic.length ? <span on-click={_ => Vue.handleView(row)} style="color: #2d8cf0;cursor: pointer;">{i18n_lang.joinList68}</span> : <span>{i18n_lang.joinList69}</span>
      }
    },
    {
      title: `${i18n_lang.joinList70}`,//当日充值金额
      align: 'center',
      minWidth: 100,
      key: 'today_recharge_amount',
      render(h, { row }) {
        return <span>{`${row.today_recharge_amount}`}</span>
      }
    },
    {
      title: `${i18n_lang.joinList71}`,//当日投注金额
      align: 'center',
      minWidth: 100,
      key: 'today_bet_amount',
      render(h, { row }) {
        return <span>{`${row.today_bet_amount}`}</span>
      }
    },
    {
      title: `${i18n_lang.joinList72}`,//累计充值金额
      align: 'center',
      minWidth: 100,
      key: 'total_recharge_amount',
      render(h, { row }) {
        return <span>{`${row.total_recharge_amount}`}</span>
      }
    },
    {
      title: `${i18n_lang.joinList73}`,//累计投注金额
      align: 'center',
      minWidth: 100,
      key: 'total_bet_amount',
      render(h, { row }) {
        return <span>{`${row.total_bet_amount}`}</span>
      }
    },
    {
      title: `${i18n_lang.joinList74}`,//状态
      align: 'center',
      minWidth: 100,
      key: 'status',
      render(h, { row }) {
        return <span>
          {row.status == 'undetermined' ? `${i18n_lang.joinList46}` : ``}
          {row.status == 'pass' ? `${i18n_lang.joinList47}` : ``}
          {row.status == 'rejected' ? `${i18n_lang.joinList48}` : ``}
        </span>
      }
    },
    {
      title: `${i18n_lang.joinList75}`,//审批时间
      align: 'center',
      minWidth: 100,
      key: 'process_time'
    },
    {
      title: `${i18n_lang.joinList76}`,//审批人
      align: 'center',
      minWidth: 100,
      key: 'operator_name'
    },
    {
      title: `${i18n_lang.joinList77}`,//备注
      align: 'center',
      minWidth: 100,
      key: 'memo'
    },
    {
      title: `${i18n_lang.joinList78}`,//操作
      align: 'center',
      minWidth: 220,
      render(h, { row }) {
        return row.status === 'undetermined' ? (
          <div>
            <Button
              type='success'
              size='small'
              on-click={_ => Vue.handleHandle(row, 1)}
            >{i18n_lang.joinList79}</Button>
            <Button
              type='error'
              size='small'
              style='margin-left:5px'
              on-click={_ => Vue.handleHandle(row, 0)}
            >{i18n_lang.joinList80}</Button>
          </div>
        ) : (
          <div>----</div>
        )
      }
    }
  ]
}
