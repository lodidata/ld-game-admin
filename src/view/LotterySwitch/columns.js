import { Switch, Button } from 'iview'

export default function(Vue, group) {
  const i18n = Vue.$t('lotterySwitch')
  return [
    {
      title: i18n.lotterySwitch18,
      align: 'center',
      key: 'group',
      render(h, { row }) {
        return row.group_start ? (
          <span combinerow={group[row.group].length}>{row.group}</span>
        ) : (
          <span deletecombinerow />
        )
      },
      myExt: {
        combinerow: true
      }
    },
    {
      title: i18n.lotterySwitch19,
      align: 'center',
      key: 'name'
    },
    {
      title: i18n.lotterySwitch20,
      align: 'center',
      render(h, { row }) {
        const len = Vue.dataSource.filter(x => x.open).length
        return (
          <Switch
            disabled={len <= 1 && !!row.open === true}
            value={!!row.open}
            on-on-change={value => Vue.editChange(value, 'open', row)}
          >
            <span slot='open'>{i18n.lotterySwitch21}</span>
            <span slot='close'>{i18n.lotterySwitch22}</span>
          </Switch>
        )
      }
    },
    {
      title: i18n.lotterySwitch23,
      key: 'buy_ball_num',
      align: 'center',
      myExt: {
        editTxt: row => {
          return row.is_ball_num === 0
        }
      }
    },
    {
      title: i18n.lotterySwitch24,
      key: 'play_text1',
      align: 'center'
    },
    {
      title: i18n.lotterySwitch25,
      key: 'play_text2',
      align: 'center'
    },
    {
      title: i18n.lotterySwitch26,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button type='primary' size='small' on-click={_ => Vue.handleOpenModal(row)}>
              {i18n.lotterySwitch27}
            </Button>
          </div>
        )
      }
    }
  ]
}
