export default function(Vue, group) {
  const i18n = Vue.$t('lotteryOddsSet')
  return [
    {
      title: i18n.lotteryOddsSet16,
      align: 'center',
      render(h, { row }) {
        return row.group_start ? (
          <span combinerow={row.group_len}>{row.group_name || row.name}</span>
        ) : (
          <span deletecombinerow />
        )
      }
    },
    {
      title: i18n.lotteryOddsSet17,
      align: 'center',
      key: 'name'
    },
    {
      title: i18n.lotteryOddsSet18,
      align: 'center',
      key: 'max_odds'
    },
    {
      title: i18n.lotteryOddsSet19,
      align: 'center',
      render(h, { row }) {
        return (
          <span class={Number(row.odds) > Number(row.max_odds) ? 'red' : ''}>
            {row.reward_radio}
          </span>
        )
      }
    },
    {
      title: i18n.lotteryOddsSet20,
      align: 'center',
      key: 'odds',
      renderFn(h, params, t, { editInput, editButton, saveButton }) {
        return h('Row', [
          h(
            'Col',
            {
              props: {
                span: '20'
              }
            },
            [
              !t.handleData[params.index]._editting[params.column.key] ? (
                <span class={Number(params.row.odds) > Number(params.row.max_odds) ? 'red' : ''}>
                  {params.row.odds}
                </span>
              ) : (
                editInput(t, h, params)
              )
            ]
          ),
          h(
            'Col',
            {
              props: {
                span: '2'
              }
            },
            [
              !t.handleData[params.index]._editting[params.column.key]
                ? editButton(t, h, params)
                : saveButton(t, h, params)
            ]
          )
        ])
      },
      myExt: {
        editTxt: true
      }
    }
  ]
}
