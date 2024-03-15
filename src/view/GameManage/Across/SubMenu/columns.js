import { Button, Poptip } from 'iview'
export const secondLevel = function(Vue) {
  const i18n = Vue.$t('gameManage')
  return [
    {
      title: i18n.gameManage22,
      align: 'center',
      minWidth: 80,
      render: (h, { row, index }) => <span>{index + 1}</span>
    },
    {
      title: Vue.game || i18n.gameManage23,
      align: 'center',
      minWidth: 80,
      key: 'name'
    },
    {
      title: i18n.gameManage24,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <img src={row.qp_img} class='thumb' />
      }
    },
    {
      title: i18n.gameManage25,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        // console.log(Vue.typeGame, '--')
        return <img src={row.qp_img2} class='thumb' />
      }
    },
    {
      title: i18n.gameManage45,
      align: 'center',
      minWidth: 80,
      key: 'm_start_time'
    },
    {
      title: i18n.gameManage46,
      align: 'center',
      minWidth: 80,
      key: 'm_end_time'
    },
    {
      title: i18n.gameManage26,
      minWidth: 220,
      align: 'center',
      key: 'name',
      render(h, { row, index }) {
        // console.log(row.id, '------')
        const showUp = index > 0
        const showDown = index < Vue.dataSource.length - 1
        const showThird = !!row.childrens
        const log = () => console.log()
        return (
          <div>
            {
              // AG视讯的id为29
              (Number(row.id) !== 29 && showThird) && <Button
                type='primary'
                size='small'
                // class={!showThird && 'hidden'}
                style='margin-right:5px'
                on-click={showThird ? _ => Vue.subMenu(row) : log}
              >
              {i18n.gameManage27}
              </Button>
            }
            {
              showUp && <Button
                type='success'
                size='small'
                // class={!showUp && 'hidden'}
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
                // class={!showDown && 'hidden'}
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
            {
              row.childrens && <Button
                type='success'
                size='small'
                style='margin-right:5px'
                on-click={_ => Vue.handleMaintain(row)}>
                {i18n.gameManage39}
              </Button>
            }
            <Poptip
              confirm
              title={`${i18n.gameManage36}${row.across_status === 'enabled' ? i18n.gameManage31 : i18n.gameManage32}${i18n.gameManage33}?`}
              on-on-ok={_ => Vue.handleStatus(row)}
            >
              <Button
                type={row.across_status === 'enabled' ? 'error' : 'success'}
                size='small'
                style='margin-right:5px'
              >
                {row.across_status === 'enabled' ? i18n.gameManage34 : i18n.gameManage35}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}

export const threeLevel  = function(Vue) {
  const i18n = Vue.$t('gameManage')
  return [
    {
      title: i18n.gameManage22,
      align: 'center',
      minWidth: 80,
      render: (h, { row, index }) => <span>{index + 1}</span>
    },
    {
      title: Vue.game || i18n.gameManage23,
      align: 'center',
      minWidth: 80,
      key: 'name'
    },
    {
      title: i18n.gameManage24,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <img src={row.game_img} class='thumb' />
      }
    },
    {
      title: i18n.gameManage25,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        // console.log(Vue.typeGame, '--')
        return <img src={row.qp_img2} class='thumb' />
      }
    },
    // {
    //   title: i18n.gameManage45,
    //   align: 'center',
    //   minWidth: 80,
    //   key: 'm_start_time'
    // },
    // {
    //   title: i18n.gameManage46,
    //   align: 'center',
    //   minWidth: 80,
    //   key: 'm_end_time'
    // },
    {
      title: i18n.gameManage26,
      minWidth: 220,
      align: 'center',
      key: 'name',
      render(h, { row, index }) {
        // console.log(row.id, '------')
        const showUp = index > 0
        const showDown = index < Vue.dataSource.length - 1
        const showThird = !!row.childrens
        const log = () => console.log()
        return (
          <div>
            {
              // AG视讯的id为29
              (Number(row.id) !== 29 && showThird) && <Button
                type='primary'
                size='small'
                // class={!showThird && 'hidden'}
                style='margin-right:5px'
                on-click={showThird ? _ => Vue.subMenu(row) : log}
              >
              {i18n.gameManage27}
              </Button>
            }
            {
              showUp && <Button
                type='success'
                size='small'
                // class={!showUp && 'hidden'}
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
                // class={!showDown && 'hidden'}
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
            {
              row.childrens && <Button
                type='success'
                size='small'
                style='margin-right:5px'
                on-click={_ => Vue.handleMaintain(row)}>
                {i18n.gameManage39}
              </Button>
            }
            <Poptip
              confirm
              title={`${i18n.gameManage36}${row.across_status === 'enabled' ? i18n.gameManage31 : i18n.gameManage32}${i18n.gameManage33}?`}
              on-on-ok={_ => Vue.handleStatus(row)}
            >
              <Button
                type={row.across_status === 'enabled' ? 'error' : 'success'}
                size='small'
                style='margin-right:5px'
              >
                {row.across_status === 'enabled' ? i18n.gameManage34 : i18n.gameManage35}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
