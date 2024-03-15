import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    {
      title: '序号',
      type: 'index',
      minWidth: 50,
      align: 'center'
    },
    {
        title: '代理账号',
        key: 'agent_code',
        minWidth: 80,
        align: 'center'
    },
   
    {
      title: '品牌名称',
      key: 'brand_name',
      minWidth: 120,
      align: 'center'
    },
    {
      title: '厂商',
      key: 'menu_type',
      minWidth: 80,
      align: 'center'
    },
    {
      title: '时间',
      minWidth: 200,
      align: 'center',
      render (h, { row }) {
        return (
            <div>
                {row.start_bill_date + ' - ' + row.end_bill_date}
            </div>
        )
      }
    },
    {
      title: '币种',
      key: 'currency_type',
      minWidth: 80,
      align: 'center'
    },
    {
        title: '有效投注',
        key: 'valid_bet',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '输赢',
        key: 'win_lose_bet',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '费率',
        key: 'rate',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '汇率',
        key: 'exchange_rate',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '交收金额',
        key: 'settlement',
        minWidth: 80,
        align: 'center'
    },
    {
      title: '操作',
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              style="margin-right:5px"
              type="error"
              size="small"
              on-click={_ => Vue.handleDelete(row, 'edit')}
            >
              删除
            </Button>
          </div>
        )
      },
      myExt: {
        label: 'handle',
        require: true
      }
    }
  ]
}