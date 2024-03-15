import { Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('gameManage')
  return [
    {
      title: i18n.gameManage22,
      align: 'center',
      minWidth: 80,
      render: (h, { row, index }) => <span>{index + 1}</span>
    },
    {
      title: i18n.gameManage23,
      align: 'center',
      minWidth: 80,
      key: 'name'
    },
    {
      title: 'LOGO',
      align: 'center',
      minWidth: 80,
      // key: 'img'
      render: (h, { row }) => {
        return <img src={ row.img } alt="" />
      }
    },
    {
      title: i18n.gameManage26,
      minWidth: 140,
      align: 'center',
      key: 'name',
      render(h, { row, index }) {
        if (row.type === 'hot') {
          return (
            <div>
              <Button
                type='primary'
                size='small'
                style='margin-right:5px'
                on-click={_ => Vue.addHotGame()}
              >
                {i18n.gameManage37}
              </Button>
              {/*
              <Poptip
                confirm
                title={`确认${row.across_status === 'enabled' ? '关闭' : '开启'}游戏入口?`}
                on-on-ok={_ => Vue.handleStatus(row)}
              >
                <Button
                  type={row.across_status === 'enabled' ? 'error' : 'success'}
                  size='small'
                  style='margin-right:5px'
                >
                  {row.across_status === 'enabled' ? '关闭入口' : '开启入口'}
                </Button>
              </Poptip> */}
            </div>
          )
        } else{
          const showSecond = !!row.childrens
          const showUp = index > 0
          const showDown = index < Vue.dataSource.length - 1
          const log = () => console.log()
          return (
            <div>
              <Button
                type='primary'
                size='small'
                class={!showSecond && 'hidden'}
                style='margin-right:5px'
                on-click={showSecond ? _ => Vue.subMenu(row) : log}
              >
                {i18n.gameManage38}
              </Button>
              {
                showUp && <Button
                  type='success'
                  size='small'
                  class={!showUp && 'hidden'}
                  style='margin-right:5px'
                  on-click={showUp ? _ => Vue.swapItems(index, index - 1) : log}
                >
                  {i18n.gameManage28}
                </Button>
              }
              {
                showDown && <Button
                  type='success'
                  size='small'
                  class={!showDown && 'hidden'}
                  style='margin-right:5px'
                  on-click={showDown ? _ => Vue.swapItems(index, index + 1) : log}
                >
                  {i18n.gameManage29}
                </Button>
              }
              <Button
                type='success'
                size='small'
                style='margin-right:5px'
                on-click={_ => Vue.handleEditIcon(row)}
              >
                {i18n.gameManage30}
              </Button>
              <Poptip
                confirm
                title={`${i18n.gameManage36}${row.status === 'enabled' ? i18n.gameManage31 : i18n.gameManage32}${i18n.gameManage33}?`}
                on-on-ok={_ => Vue.handleStatus(row)}
              >
                <Button
                  type={row.status === 'enabled' ? 'error' : 'success'}
                  size='small'
                  style='margin-right:5px'
                >
                  {row.status === 'enabled' ? i18n.gameManage34 : i18n.gameManage35}
                </Button>
              </Poptip>
              <Button
                type='primary'
                size='small'
                style='margin-right:5px'
                on-click={ _ => Vue.handleEditName(row) }
              >
                {`${i18n.gameManage54}`}
              </Button>
            </div>
          )
        }
      }
    }
  ]
}
