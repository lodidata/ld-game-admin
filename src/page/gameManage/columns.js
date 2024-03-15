import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    {
      title: 'ID',
      key: 'id',
      minWidth: 80,
      align: 'center'
    },
    {
      title: '厂商名称',
      key: 'menu_name',
      minWidth: 100,
      align: 'center'
    },
    {
      title: '厂商标识',
      key: 'menu_type',
      minWidth: 100,
      align: 'center'
    },
    {
      title: '货币',
      width: '300',
      key: 'currency',
      align: 'center'
    },
    {
      title: '状态',
      minWidth: 100,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
          { <Poptip
            confirm
            title={`确认${row.status == 0 ? '上架' : '下架'}`}
            on-on-ok={_ => Vue.handleStop(row)}
          >
            
            <Button
              v-btn={36}
              type={row.status === 0 ? 'error' : 'success'}
              size='small'
         
              style='margin-right:5px'
            >
              {row.status === 0 ? '已下架' : '已上架'}
            </Button>
          </Poptip>}
        </div>
        )
      }
    },
    {
      title: '游戏登录API接口',
      width: '300',
      key: 'api_login_url',
      align: 'center'
    },
    {
      title: '游戏通用API接口',
      width: '300',
      key: 'api_api_url',
      align: 'center'
    },
    {
      title: '游戏拉单API接口',
      width: '300',
      key: 'api_order_url',
      align: 'center'
    },
    {
      title: '上架时间',
      key: 'created_at',
      minWidth: 140,

      align: 'center'
    },
    {
      title: '工作状态',
      key: 'work_status_str',
      minWidth: 100,

      align: 'center'
    },
    {
      title: '维护时间',
      key: 'end_uworked_at',
      render(h, { row }) {
        return (
          <div>{row.start_uworked_at} - {row.end_uworked_at}</div>
        )
      },
      minWidth: 140,
      align: 'center'
    },
    {
      title: '操作',
      minWidth: 200,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {/* <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              编辑
            </Button> */}
            <Button
              v-auth={81}
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.openIp(row)}
            >
              IP加白
            </Button>

            <Button v-auth={34} type="success" size="small" on-click={_ => Vue.handleSwitch(row)}>
              维护
            </Button>


            <Button v-auth={59} style="margin-left:5px" size="small" type="primary" on-click={_ => Vue.onGameManage(row)}>
              游戏管理
            </Button>

            <Button style="margin-left:5px" size="small" type="primary" on-click={_ => Vue.onEditCurrency(row)}>
              编辑货币
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
