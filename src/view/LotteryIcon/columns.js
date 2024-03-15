import { Button } from 'iview'
export default function (Vue, group) {
  const i18n = Vue.$t('lotteryIcon')
  return [
    {
      title: i18n.lotteryIcon9,
      align: 'center',
      render(h, { row }) {
        return row.group_start ? (
          <span combinerow={group[row.pid].length}>{row.p_name || row.name}</span>
        ) : (<span deletecombinerow />)
      }
    },
    {
      title: i18n.lotteryIcon10,
      align: 'center',
      key: 'name'
    },
    {
      title: i18n.lotteryIcon11,
      align: 'center',
      render(h, { row }) {
        return row.index_f_img ? (<img src={row.index_f_img} class='thumb1' />) : <span>-</span>
      }
    },
    {
      title: i18n.lotteryIcon12,
      align: 'center',
      render(h, { row }) {
        return row.index_c_img ? (<img src={row.index_c_img} class='thumb1' />) : <span>-</span>
      }
    },
    {
      title: i18n.lotteryIcon13,
      align: 'center',
      render(h, { row }) {
        return row.buy_f_img ? (<img src={row.buy_f_img} class='thumb' />) : <span>-</span>
      }
    },
    {
      title: i18n.lotteryIcon14,
      align: 'center',
      render(h, { row }) {
        return row.buy_c_img ? (<img src={row.buy_c_img} class='thumb' />) : <span>-</span>
      }
    },
    {
      title: i18n.lotteryIcon15,
      align: 'center',
      render(h, { row }) {
        return row.open_img ? (<img src={row.open_img} class='thumb' />) : <span>-</span>
      }
    },
    {
      title: i18n.lotteryIcon16,
      width: 120,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.lotteryIcon17}
            </Button>
          </div>
        )
      }
    }
  ]
}
