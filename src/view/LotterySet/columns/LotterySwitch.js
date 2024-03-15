import { Switch } from 'iview'

export default function(Vue, group) {
  const i18n = Vue.$t('lotterySet')
  return [
    {
      title: i18n.lotterySet19,
      align: 'center',
      render(h, { row }) {
        return row.group_start ? (
          <span combinerow={group[row.pid].length}>{row.p_name || row.name}</span>
        ) : (
          <span deletecombinerow />
        )
      }
    },
    {
      title: i18n.lotterySet20,
      align: 'center',
      key: 'name'
    },
    {
      title: i18n.lotterySet21,
      align: 'center',
      render(h, { row }) {
        return (
          <Switch
            value={!!row.is_enabled}
            disabled={!row.support_enabled}
            on-on-change={value => Vue.switchChange(value, 'enabled', row)}
          >
            <span slot='open'>{i18n.lotterySet22}</span>
            <span slot='close'>{i18n.lotterySet23}</span>
          </Switch>
        )
      }
    },
    {
      title: i18n.lotterySet24,
      align: 'center',
      render(h, { row }) {
        return (
          <Switch
            value={!!row.is_standard}
            disabled={!row.support_standard}
            on-on-change={value => Vue.switchChange(value, 'standard', row)}
          >
            <span slot='open'>{i18n.lotterySet22}</span>
            <span slot='close'>{i18n.lotterySet23}</span>
          </Switch>
        )
      }
    },
    // {
    //   title: i18n.lotterySet25,
    //   align: 'center',
    //   render(h, { row }) {
    //     return (
    //       <Switch
    //         value={!!row.is_chat}
    //         disabled={!row.support_chat}
    //         on-on-change={value => Vue.switchChange(value, 'chat', row)}
    //       >
    //         <span slot='open'>{i18n.lotterySet22}</span>
    //         <span slot='close'>{i18n.lotterySet23}</span>
    //       </Switch>
    //     )
    //   }
    // },
    // {
    //   title: i18n.lotterySet26,
    //   align: 'center',
    //   key: 'start_delay',
    //   myExt: {
    //     editTxt: true,
    //     label: 'start_delay'
    //   }
    // }
  ]
}
