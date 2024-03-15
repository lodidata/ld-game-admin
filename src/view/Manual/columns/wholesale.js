import { Poptip, Button } from 'iview'
import { MathDiv } from '@/libs/formatMath'
export default function(Vue) {
  const i18n = Vue.$t('manual')
  return [
    {
      type: 'selection',
      width: 30,
      title: '',
      fixed: 'left',
      align: 'center'
    },
    {
      title: `${i18n.manual110_v_1_2_4_6}`,//提交时间
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: `${i18n.manual128_v_1_2_4_6}`,//后台账号
      align: 'center',
      minWidth: 100,
      key: 'admin_user'
    },
    {
      title: `${i18n.manual129_v_1_2_4_6}`,//备注
      align: 'center',
      minWidth: 100,
      key: 'memo'
    },
    {
      title: `${i18n.manual112_v_1_2_4_6}`,//用户账号
      align: 'center',
      minWidth: 100,
      key: 'username'
    },
    {
      title: `${i18n.manual114_v_1_2_4_6}`,//加款类型
      align: 'center',
      minWidth: 100,
      key: 'adjust_type'
    },
    {
      title: `${i18n.manual113_v_1_2_4_6}`,//加款金额
      align: 'center',
      minWidth: 100,
      key: 'money',
      render(h, { row }) {
        return <span>{MathDiv(row.money, 1)}</span>
      }
    },
    {
      title: `${i18n.manual132_v_1_2_4_6}`,//状态
      align: 'center',
      minWidth: 100,
      key: 'money',
      render(h, { row }) {
        return <span>{row.status == 1 ? `${i18n.manual121_v_1_2_4_6}` : ``}{row.status == 2 ? `${i18n.manual123_v_1_2_4_6}` : ``}</span>
      }
    },
    {
      title: `${i18n.manual130_v_1_2_4_6}`,//账户余额
      align: 'center',
      minWidth: 100,
      key: 'money',
      render(h, { row }) {
        return <span>{MathDiv(row.balance, 1)}</span>
      }
    },
    {
      title: `${i18n.manual131_v_1_2_4_6}`,//操作
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return row.status == 0 ? (
          <div>
            <Poptip
              confirm
              title={`${i18n.manual120_v_1_2_4_6}?`}
              on-on-ok={_ => Vue.handleStatus(row, 1)}
            >
              <Button
                type='success'
                size='small'
                style='margin-right:5px'
              >
                {`${i18n.manual121_v_1_2_4_6}`}
              </Button>
            </Poptip>
            <Poptip
              confirm
              title={`${i18n.manual122_v_1_2_4_6}?`}
              on-on-ok={_ => Vue.handleStatus(row, 2)}
            >
              <Button
                type='error'
                size='small'
              >
                {`${i18n.manual123_v_1_2_4_6}`}
              </Button>
            </Poptip>
          </div>
        ) : (
          <div>--</div>
        )
      }
    }
  ]
}
